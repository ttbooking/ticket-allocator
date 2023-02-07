<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'teams' => 'sometimes|required|array',
            'teams.*' => 'sometimes|required|uuid',
            'ticket_limit' => 'sometimes|required|integer',
            'complexity_limit' => 'sometimes|required|integer',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, mixed>
     */
    public function attributes(): array
    {
        return (array) trans('ticket-allocator::validation.attributes');
    }
}
