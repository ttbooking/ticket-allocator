<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Matchers;

use Closure;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Enumerable;
use JsonSerializable;
use Traversable;
use UnitEnum;

class Builder implements Arrayable, Jsonable, JsonSerializable
{
    protected array $wheres = [];

    public function newQuery(): static
    {
        return new static;
    }

    public function where(
        Closure|string $type,
        string $operator = null,
        mixed $value = null,
        string $boolean = 'and',
        bool $not = false,
    ): static {
        if ($type instanceof Closure) {
            return $this->whereNested($type, $boolean, $not);
        }

        $this->wheres[] = compact('type', 'operator', 'value', 'boolean', 'not');

        return $this;
    }

    public function orWhere(string $type, string $operator, mixed $value, bool $not = false): static
    {
        return $this->where($type, $operator, $value, 'or', $not);
    }

    public function whereNested(Closure $callback, string $boolean = 'and', bool $not = false): static
    {
        $callback($query = $this->newQuery());

        return $this->addNestedWhereQuery($query, $boolean);
    }

    public function addNestedWhereQuery(self $query, string $boolean = 'and', bool $not = false): static
    {
        if (count($query->wheres)) {
            $type = 'group';
            $value = $query->toArray();
            $this->wheres[] = compact('type', 'value', 'boolean', 'not');
        }

        return $this;
    }

    public function toArray(): array
    {
        return $this->wheres;
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public function toJson($options = 0): string
    {
        return json_encode($this->jsonSerialize(), $options);
    }

    protected function getArrayableItems(mixed $items): array
    {
        return match (true) {
            is_array($items) => $items,
            $items instanceof Enumerable => $items->all(),
            $items instanceof Arrayable => $items->toArray(),
            $items instanceof Traversable => iterator_to_array($items),
            $items instanceof Jsonable => json_decode($items->toJson(), true),
            $items instanceof JsonSerializable => (array) $items->jsonSerialize(),
            $items instanceof UnitEnum => [$items],
            default => (array) $items,
        };
    }
}
