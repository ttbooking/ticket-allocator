<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Matchers;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;

abstract class Matcher implements MatcherContract
{
    /** @var array<class-string<static>, string> */
    protected static array $aliases = [];

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
        $key = 'ticket-allocator::matcher.'.static::getAlias();
        $name = trans($key);

        return $name !== $key ? $name : class_basename(static::class);
    }

    public static function isExcluded(): bool
    {
        return (bool) self::attribute(Attributes\Excluded::class, true);
    }

    public function getProps(): array
    {
        return [];
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
