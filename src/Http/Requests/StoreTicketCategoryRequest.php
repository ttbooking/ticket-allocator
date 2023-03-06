<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketCategoryRequest extends FormRequest
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
            'short' => 'required|string|max:32',
            'initial_weight' => 'required|integer|between:0,9999999',
            'weight_increment' => 'required|integer|between:0,99999',
            'complexity' => 'required|integer|between:0,9999',
            'delay' => 'required|integer|between:0,99999',
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
