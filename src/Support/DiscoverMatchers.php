<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Support\Str;
use SplFileInfo;
use Symfony\Component\Finder\Finder;
use TTBooking\TicketAllocator\Contracts\Matcher as MatcherContract;

class DiscoverMatchers
{
    /**
     * Get all the matchers by searching the given matcher directory.
     *
     * @return list<class-string<MatcherContract>>
     */
    public static function within(string $matcherPath, string $basePath): array
    {
        return collect((new Finder)->files()->in($matcherPath))
            ->map(static fn (SplFileInfo $file) => static::classFromFile($file, $basePath))
            ->filter(static::isExplicit(...))
            ->values()
            ->all();
    }

    /**
     * @param  class-string<MatcherContract>  $matcher
     * @return bool
     */
    public static function isExplicit(string $matcher): bool
    {
        return is_subclass_of($matcher, MatcherContract::class)
            && (new \ReflectionClass($matcher))->isInstantiable()
            && ! $matcher::isExcluded();
    }

    /**
     * Extract the class name from the given file path.
     */
    protected static function classFromFile(SplFileInfo $file, string $basePath): string
    {
        $class = trim(Str::replaceFirst($basePath, '', $file->getRealPath()), DIRECTORY_SEPARATOR);

        return str_replace(
            [DIRECTORY_SEPARATOR, ucfirst(basename(app()->path())).'\\'],
            ['\\', app()->getNamespace()],
            ucfirst(Str::replaceLast('.php', '', $class))
        );
    }
}
