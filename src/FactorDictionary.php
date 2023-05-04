<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator;

use Illuminate\Support\Collection;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Contracts\FactorDictionary as FactorDictionaryContract;

class FactorDictionary implements FactorDictionaryContract
{
    /**
     * @var Collection<string, class-string<FactorContract>>
     */
    protected Collection $dictionary;

    /**
     * @return Collection<string, class-string<FactorContract>>
     */
    public function getDictionary(): Collection
    {
        return $this->dictionary ??= collect(config('ticket-allocator.factors', []))
            ->filter(static fn (string $class) => is_subclass_of($class, FactorContract::class))
            ->mapWithKeys(self::mapFactor(...))
            ->sortBy(self::factorName(...));
    }

    /**
     * @param  string  $alias
     * @return class-string<FactorContract>|false
     */
    public function getClass(string $alias): string|false
    {
        return $this->getDictionary()->get($alias, false);
    }

    /**
     * @param  class-string<FactorContract>  $class
     * @param  array-key  $alias
     * @return array<string, class-string<FactorContract>>
     */
    private static function mapFactor(string $class, string|int $alias): array
    {
        is_string($alias) && $class::setAlias($alias);

        return [$class::getAlias() => $class];
    }

    /**
     * @param  class-string<FactorContract>  $class
     * @return string
     */
    private static function factorName(string $class): string
    {
        return $class::getName();
    }
}
