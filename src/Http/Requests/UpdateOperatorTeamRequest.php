<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatorTeamRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'operators' => 'required|array',
            'operators.*' => 'required|uuid',
            'ticket_categories' => 'required|array',
            'ticket_categories.*' => 'required|uuid',
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
