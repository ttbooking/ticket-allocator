<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

use Illuminate\Support\Collection;
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
        $key = 'ticket-allocator::factor.'.static::getAlias();
        $name = trans($key);

        return $name !== $key ? $name : class_basename(static::class);
    }

    public static function isExcluded(): bool
    {
        return (bool) self::attribute(Attributes\Excluded::class, true);
    }

    public static function isHidden(): bool
    {
        return (bool) self::attribute(Attributes\Hidden::class, true);
    }

    public static function isSingular(): bool
    {
        return (bool) self::attribute(Attributes\Singular::class, true);
    }

    public static function getComponentName(): ?string
    {
        return static::attribute(Attributes\Component::class, true)?->name;
    }

    final public static function getInstanceData(): Collection
    {
        return static::attributes(Attributes\Instance::class)->map(static function (Attributes\Instance $instance) {
            return ['type' => static::getAlias()] + $instance->attributes;
        });
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
     * @template TAttribute of object
     *
     * @param  class-string<TAttribute>  $attribute
     * @param  bool  $ascend
     * @return Collection<int, TAttribute>
     */
    private static function attributes(string $attribute, bool $ascend = false): Collection
    {
        $classRef = new \ReflectionClass(static::class);
        $attrRefs = collect();

        do {
            $attrRefs->push(...$classRef->getAttributes($attribute));
        } while ($ascend && false !== $classRef = $classRef->getParentClass());

        return $attrRefs->map->newInstance();
    }

    /**
     * @template TAttribute of object
     *
     * @param  class-string<TAttribute>  $attribute
     * @param  bool  $ascend
     * @return TAttribute|null
     */
    private static function attribute(string $attribute, bool $ascend = false)
    {
        return self::attributes($attribute, $ascend)->first();
    }
}
