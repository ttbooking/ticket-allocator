<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

/**
 * @template TConfig of array
 *
 * @implements FactorContract<TConfig>
 */
abstract class Factor implements FactorContract
{
    /** @var array<class-string<static>, string> */
    protected static array $aliases = [];

    /** @var TConfig */
    protected $config = [];

    public static function setAlias(string $alias): void
    {
        static::$aliases[static::class] = $alias;
    }

    public static function getAlias(): string
    {
        return static::$aliases[static::class]
            ?? static::attribute(Attributes\Alias::class)?->alias
            ?? Str::snake(class_basename(static::class));
    }

    public static function getName(): string
    {
        return trans('ticket-allocator::factor.'.static::getAlias());
    }

    public static function isExcluded(): bool
    {
        return self::flagSet(Attributes\Excluded::class);
    }

    public static function isHidden(): bool
    {
        return self::flagSet(Attributes\Hidden::class);
    }

    public static function isSingular(): bool
    {
        return self::flagSet(Attributes\Singular::class);
    }

    public static function getComponentName(): ?string
    {
        return static::attribute(Attributes\Component::class)?->name;
    }

    public function getProps(): array
    {
        return [];
    }

    /**
     * @param  TConfig  $config
     * @return $this
     */
    public function configure($config): static
    {
        $this->config = $config;

        return $this;
    }

    /**
     * @return TConfig
     */
    public function getConfig(): array
    {
        return $this->config;
    }

    /**
     * @param  class-string  $flagAttribute
     * @return bool
     */
    private static function flagSet(string $flagAttribute): bool
    {
        return ! empty((new \ReflectionClass(static::class))->getAttributes($flagAttribute));
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
