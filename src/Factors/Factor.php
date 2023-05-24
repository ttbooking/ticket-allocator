<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Enumerable;
use Illuminate\Support\Str;
use Spatie\LaravelData\Contracts\DataCollectable;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;
use TTBooking\TicketAllocator\Contracts\FactorConfig;
use TTBooking\TicketAllocator\DTO\UnknownConfig;

/**
 * @template TFactorConfig of FactorConfig
 *
 * @implements FactorContract<TFactorConfig>
 */
abstract class Factor implements FactorContract
{
    /** @var array<class-string<static>, string> */
    protected static array $aliases = [];

    /** @var array<class-string<static>, class-string<FactorConfig>> */
    protected static array $configClasses = [];

    /** @var TFactorConfig|DataCollectable<array-key, TFactorConfig> */
    protected $config;

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

    public static function getConfigClass(): string
    {
        if (isset(static::$configClasses[static::class])) {
            return static::$configClasses[static::class];
        }

        /** @var list<class-string<FactorConfig>> $guesses */
        $guesses = array_filter([
            static::attribute(Attributes\Config::class)?->class,
            'TTBooking\\TicketAllocator\\DTO\\'.class_basename(static::class).'Config',
        ]);

        foreach ($guesses as $configClass) {
            if (class_exists($configClass) && is_subclass_of($configClass, FactorConfig::class)) {
                return static::$configClasses[static::class] ??= $configClass;
            }
        }

        return static::$configClasses[static::class] ??= UnknownConfig::class;
    }

    public static function makeConfig(Enumerable|array $config)
    {
        $collection = static::attribute(Attributes\Config::class)?->collection;

        return static::getConfigClass()::{$collection ? 'collection' : 'from'}($config);
    }

    public static function getComponentName(): ?string
    {
        return static::attribute(Attributes\Component::class)?->name;
    }

    public function getProps(): array
    {
        return [];
    }

    public function configure($config): static
    {
        $this->config = $config;

        return $this;
    }

    public function getConfig()
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
