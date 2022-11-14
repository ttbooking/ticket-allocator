<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Domain\Support;

use Illuminate\Support\Str;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use TTBooking\TicketAllocator\Contracts\Factor;
use TTBooking\TicketAllocator\Contracts\FactorRepository as FactorRepositoryContract;
use TTBooking\TicketAllocator\Exceptions\FactorResolutionException;
use TTBooking\TicketAllocator\Models\Factor as FactorModel;

class FactorRepository implements FactorRepositoryContract
{
    /** @var array<non-empty-string, Factor> */
    protected array $factors = [];

    /** @var array<class-string<Event>, list<non-empty-string>> */
    protected array $events = [];

    public function __construct(protected ContainerInterface $container)
    {
        FactorModel::query()->each(function (FactorModel $factorModel) {
            $this->factors[$factorModel->uuid] = $this
                ->newInstance($factorModel->class)
                ->configure($factorModel->config);
        });
    }

    /**
     * @param  class-string<Event>  $event
     * @return list<Factor>
     *
     * @throws FactorResolutionException
     */
    public function getForEvent(string $event): array
    {
        $factors = [];

        foreach ($this->events[$event] as $uuid) {
            $factors[] = $this->get($uuid);
        }

        return $factors;
    }

    /**
     * Create new factor instance.
     *
     * @param  class-string  $factor
     * @return Factor
     *
     * @throws FactorResolutionException
     */
    protected function newInstance(string $factor): Factor
    {
        try {
            $factor = $this->container->get($factor);
        } catch (ContainerExceptionInterface $e) {
            throw new FactorResolutionException('Error fetching object from container.', 0, $e);
        }

        if (! $factor instanceof Factor) {
            throw new FactorResolutionException("Given object doesn't implement Factor contract.");
        }

        return $factor;
    }

    /**
     * @param  non-empty-string  $uuid
     * @return Factor
     *
     * @throws FactorResolutionException
     */
    public function get(string $uuid): Factor
    {
        if (! isset($this->factors[$uuid])) {
            throw new FactorResolutionException('Factor instance not found in repository.');
        }

        return $this->factors[$uuid];
    }

    /**
     * @param  class-string  $factor
     * @param  mixed[]  $config
     * @param  string|null  $description
     * @return non-empty-string
     *
     * @throws FactorResolutionException
     */
    public function add(string $factor, array $config = [], string $description = null): string
    {
        $uuid = (string) Str::uuid();

        $this->factors[$uuid] = $this->newInstance($factor)->configure($config);

        FactorModel::query()->create(compact('uuid', 'factor', 'config', 'description'));

        return $uuid;
    }
}
