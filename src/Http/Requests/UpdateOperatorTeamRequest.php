<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatorTeamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'active' => 'sometimes|required|boolean',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:65535',
            'operators' => 'sometimes|array',
            'operators.*' => 'sometimes|required|uuid',
            'ticket_categories' => 'sometimes|array',
            'ticket_categories.*' => 'sometimes|required|uuid',
            'matching' => 'sometimes|array',
            'matching.*' => 'sometimes|array',
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
