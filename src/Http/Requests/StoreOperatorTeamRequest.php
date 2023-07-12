<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOperatorTeamRequest extends FormRequest
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
            'active' => 'required|boolean',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:65535',
            'weight' => 'required|integer|between:0,1000',
            'operators' => 'array',
            'operators.*' => 'required|uuid',
            'matching' => 'array',
            'matching.*' => 'array',
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
