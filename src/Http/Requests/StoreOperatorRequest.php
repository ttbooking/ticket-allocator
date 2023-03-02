<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOperatorRequest extends FormRequest
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
            'user' => 'required',
            'name' => 'nullable|string|max:255',
            'ticket_limit' => 'nullable|integer|between:1,100',
            'complexity_limit' => 'nullable|integer|between:1,1000',
            'teams' => 'array',
            'teams.*' => 'required|uuid',
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
