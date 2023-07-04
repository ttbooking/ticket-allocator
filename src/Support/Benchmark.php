<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Support;

use Closure, Stringable;

class Benchmark implements Stringable
{
    protected array $groups = [];

    public function measure(string $group, Closure $callback): mixed
    {
        $start = hrtime(true);

        $result = $callback();

        $duration = (hrtime(true) - $start) / 1000000;

        $this->groups[$group]['runs'][] = $duration;
        $this->groups[$group]['count'] = count($this->groups[$group]['runs']);
        $this->groups[$group]['sum'] = array_sum($this->groups[$group]['runs']);
        $this->groups[$group]['min'] = min($this->groups[$group]['runs']);
        $this->groups[$group]['max'] = max($this->groups[$group]['runs']);
        $this->groups[$group]['avg'] = $this->groups[$group]['sum'] / $this->groups[$group]['count'];

        return $result;
    }

    public function __toString(): string
    {
        $accum = "Group\tRuns\tTotal\tMin\tMax\tAverage\n";
        $accum .= "-----------------------------------------------------\n";

        foreach ($this->groups as $group => ['count' => $count, 'sum' => $sum, 'min' => $min, 'max' => $max, 'avg' => $avg]) {
            $accum .= "$group\t$count\t$sum\t$min\t$max\t$avg\n";
        }

        return $accum;
    }
}
