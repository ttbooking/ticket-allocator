<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use TTBooking\TicketAllocator\Facades\Factor as FactorDictionary;
use TTBooking\TicketAllocator\Models\Factor;

class UpdateFactorRequest extends FormRequest
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
            'type' => 'sometimes|required|string|max:255|'.Rule::in(FactorDictionary::keys()),
            'name' => 'sometimes|nullable|string|max:255|unique:'.Factor::class,
            'description' => 'sometimes|nullable|string|max:65535',
            'config' => 'sometimes|array',
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
