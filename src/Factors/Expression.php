<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Symfony\Component\ExpressionLanguage\ExpressionLanguage;
use TTBooking\TicketAllocator\Domain\Ticket\TicketAggregateRoot;

#[Attributes\Component('Factor/Partials/ExpressionForm')]
class Expression extends Factor
{
    public function __construct(protected ExpressionLanguage $expression)
    {
    }

    public static function isExcluded(): bool
    {
        return ! class_exists(ExpressionLanguage::class);
    }

    public function getAdjustments(TicketAggregateRoot $ticket): array
    {
        $eval = function (string $metric) use ($ticket) {
            $config = $this->getConfig();
            $variables = $config['variables'] ?? [];
            $expression = $config['expressions'][$metric] ?? null;
            $adjustment = 0;

            if ($expression) {
                $adjustment = $this->expression->evaluate($expression, compact('ticket', 'variables'));

                if (! is_int($adjustment)) {
                    throw new \UnexpectedValueException('Expression evaluated to a non-integer value.');
                }
            }

            return $adjustment;
        };

        return array_combine(
            $metrics = ['initial_weight', 'weight_increment', 'complexity', 'delay'],
            array_map($eval, $metrics)
        );
    }
}
