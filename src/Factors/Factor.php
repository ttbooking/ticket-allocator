<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Attributes\Factors\Alias;
use TTBooking\TicketAllocator\Attributes\Factors\Component;
use TTBooking\TicketAllocator\Attributes\Factors\Singular;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

abstract class Factor implements FactorContract
{
    /** @var array<class-string<static>, string> */
    protected static array $alias = [];

    protected array $config = [];

    public static function setAlias(string $alias): void
    {
        static::$alias[static::class] = $alias;
    }

    public static function getAlias(): string
    {
        return static::$alias[static::class]
            ?? static::attribute(Alias::class)?->alias
            ?? Str::snake(class_basename(static::class));
    }

    public static function getName(): string
    {
        return trans('ticket-allocator::factor.'.static::getAlias());
    }

    public static function isSingular(): bool
    {
        return ! empty((new \ReflectionClass(static::class))->getAttributes(Singular::class));
    }

    public static function getComponentName(): ?string
    {
        return static::attribute(Component::class)?->name;
    }

    public function getProps(): array
    {
        return [];
    }

    public function configure(array $config): static
    {
        $this->config = $config;

        return $this;
    }

    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @template TAttribute of object
     *
     * @param  class-string<TAttribute>  $attribute
     * @return TAttribute|null
     */
    private static function attribute(string $attribute)
    {
        return ((new \ReflectionClass(static::class))->getAttributes($attribute)[0] ?? null)?->newInstance();
    }
}
