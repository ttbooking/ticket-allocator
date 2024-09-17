<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Factors;

/**
 * @template TEntry of array{
 *     value: string,
 *     initial_weight: int,
 *     weight_increment: int,
 *     complexity: int,
 *     delay: int,
 *     reservation: int,
 * }
 *
 * @extends Factor<TEntry[]>
 */
#[Attributes\Singular]
#[Attributes\Component('Factor/Partials/AssociationForm')]
abstract class AssociationFactor extends Factor {}
