<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Ticket\Factors;

use Illuminate\Support\Str;
use ReflectionProperty;
use Spatie\EventSourcing\Commands\CommandBus;
use Spatie\EventSourcing\StoredEvents\ShouldBeStored;
use Symfony\Component\ExpressionLanguage\Expression;
use Symfony\Component\ExpressionLanguage\ExpressionLanguage;
use TTBooking\TicketAllocator\Contracts\ShouldAffect;
use TTBooking\TicketAllocator\Domain\Attributes\Incrementable;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

class ExpressiveFactor extends Factor
{
    /** @var array<string, mixed> */
    protected array $variables = [];

    /** @var Expression|null */
    protected ?Expression $condition = null;

    /** @var array<string, Expression> */
    protected array $mutations = [];

    public function __construct(
        protected ExpressionLanguage $expression,
        protected CommandBus $bus,
    ) {
    }

    /**
     * @param  string  $name
     * @param  mixed  $value
     * @return $this
     */
    public function setVariable(string $name, mixed $value): static
    {
        $this->variables[$name] = $value;

        return $this;
    }

    /**
     * @param  array<string, mixed>  $variables
     * @return $this
     */
    public function setVariables(array $variables): static
    {
        $this->variables = array_merge($this->variables, $variables);

        return $this;
    }

    /**
     * @param  Expression|string  $condition
     * @return $this
     */
    public function setCondition(Expression|string $condition): static
    {
        $this->condition = is_string($condition) ? new Expression($condition) : $condition;

        return $this;
    }

    /**
     * @param  string  $property
     * @param  Expression|string  $expression
     * @return $this
     */
    public function setMutation(string $property, Expression|string $expression): static
    {
        $this->mutations[$property] = is_string($expression) ? new Expression($expression) : $expression;

        return $this;
    }

    /**
     * @param  array<string, Expression|string>  $mutations
     * @return $this
     */
    public function setMutations(array $mutations): static
    {
        foreach ($mutations as $property => $expression) {
            $this->setMutation($property, $expression);
        }

        return $this;
    }

    protected function handleFactor(ShouldBeStored&ShouldAffect $event): void
    {
        if (is_null($uuid = $event->aggregateRootUuid())) {
            return;
        }

        $entity = TicketAggregateRoot::retrieve($uuid);
        $values = ['_' => $entity] + $this->variables;

        // проверка выполнения условия (или его отсутствия)
        if (! (is_null($this->condition) || $this->expression->evaluate($this->condition, $values))) {
            return;
        }

        // применение мутаций посредством диспетчеризации команд
        foreach ($this->mutations as $property => $expression) {
            $result = $this->expression->evaluate($expression, $values);
            $property = Str::camel($property);
            $refProperty = new ReflectionProperty($entity, $property);
            $incrementable = ! empty($refProperty->getAttributes(Incrementable::class));

            if ($result !== $entity->$property) {
                $namespace = 'TTBooking\\TicketAllocator\\Domain\\Ticket\\Commands\\';
                if ($incrementable) {
                    $diff = $result - $entity->$property;
                    $command = $namespace.($diff > 0 ? 'Increment' : 'Decrement').'Ticket'.Str::studly($property);
                    $this->bus->dispatch(new $command($entity->uuid(), abs($diff)));
                } else {
                    $command = $namespace.'SetTicket'.Str::studly($property);
                    $this->bus->dispatch(new $command($entity->uuid(), $result));
                }
            }
        }
    }
}
