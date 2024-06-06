<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageBannerPostRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image_one' => 'image|dimensions:min_width=1920,min_height=700|nullable',
            'image_two' => 'image|dimensions:min_width=1920,min_height=700|nullable',
            'image_three' => 'image|dimensions:min_width=1920,min_height=700|nullable',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'dimensions' => 'The :attribute should be minimun width :min_width and minimum height :min_height.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'image_one' => 'About Banner',
            'image_two' => 'Contact Banner',
            'image_three' => 'FAQs Banner',
        ];
    }
}
