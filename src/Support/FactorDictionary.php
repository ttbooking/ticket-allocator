<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Factors\Unknown;
use TTBooking\TicketAllocator\Models\Factor;

/**
 * @template TKey of string
 * @template-covariant TValue of class-string<FactorContract>
 * @template TDefault of TValue|null
 *
 * @implements Collection<TKey, TValue>
 */
class FactorDictionary extends Collection
{
    public function visible(): static
    {
        return $this->reject(
            /** @param class-string<FactorContract> $factor */
            static fn (string $factor) => $factor::isHidden()
        );
    }

    public function allowed(): static
    {
        return $this->visible()->diff(Factor::all()->pluck('type')->filter(
            /** @param class-string<FactorContract> $factor */
            static fn (string $factor) => $factor::isSingular()
        ));
    }

    /**
     * @return Collection<int, array{
     *     uuid: string|null,
     *     type: string,
     *     name: string|null,
     *     description: string|null,
     *     config: array|null,
     *     enable: bool,
     * }>
     */
    public function instances(): Collection
    {
        return $this
            ->flatMap(
                /** @param class-string<FactorContract> $factor */
                static fn (string $factor) => $factor::getInstanceData()
            )
            ->sortBy('priority')->values()
            ->map(static fn (array $attributes) => Arr::except($attributes, 'priority'));
    }

    /**
     * @template TFirstDefault of TDefault
     */
    public function first(callable $callback = null, $default = null): string
    {
        return parent::first($callback, static::default($default));
    }

    /**
     * @template TGetDefault of TDefault
     */
    public function get($key, $default = null): string
    {
        return parent::get($key, static::default($default));
    }

    /**
     * @template TLastDefault of TDefault
     */
    public function last(callable $callback = null, $default = null): string
    {
        return parent::last($callback, static::default($default));
    }

    /**
     * @template TPullDefault of TDefault
     */
    public function pull($key, $default = null): string
    {
        return parent::pull($key, static::default($default));
    }

    public function offsetGet($key): mixed
    {
        return parent::offsetGet($key) ?? static::default();
    }

    /**
     * @param  TDefault|(\Closure(): TDefault)  $default
     * @return TValue
     */
    protected static function default(mixed $default = null): string
    {
        return is_subclass_of($value = value($default), FactorContract::class)
            ? $value : config('ticket-allocator.null_factor', Unknown::class);
    }
}
