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
            ->mapWithKeys(static function (string $class, string|int $alias) {
                is_string($alias) && $class::setAlias($alias);

                return [$class::getAlias() => $class];
            });
    }
}
