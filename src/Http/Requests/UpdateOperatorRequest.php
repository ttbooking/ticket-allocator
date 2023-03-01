<?php

declare(strict_types=1);

namespace TTBooking\TicketAllocator\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOperatorRequest extends FormRequest
{
    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        if (isset($this->ticket_limit) && $this->ticket_limit === '') {
            $this->ticket_limit = null;
        }

        if (isset($this->complexity_limit) && $this->complexity_limit === '') {
            $this->complexity_limit = null;
        }
    }

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
            'ticket_limit' => 'sometimes|nullable|integer|between:1,100',
            'complexity_limit' => 'sometimes|nullable|integer|between:1,1000',
            'teams' => 'sometimes|array',
            'teams.*' => 'sometimes|required|uuid',
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
