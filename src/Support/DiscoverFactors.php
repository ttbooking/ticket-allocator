<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Illuminate\Support\Str;
use SplFileInfo;
use Symfony\Component\Finder\Finder;
use TTBooking\TicketAllocator\Contracts\Factor as FactorContract;

class DiscoverFactors
{
    /**
     * Get all the ticket metric factors by searching the given factor directory.
     *
     * @return list<class-string<FactorContract>>
     */
    public static function within(string $factorPath, string $basePath): array
    {
        return collect((new Finder)->files()->in($factorPath))
            ->map(static fn (SplFileInfo $file) => static::classFromFile($file, $basePath))
            ->filter(static fn (string $class) => is_subclass_of($class, FactorContract::class))
            ->all();
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
