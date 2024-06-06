<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeSectionPostRequest extends FormRequest
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
            'sec1_tagline' => 'string|max:50|nullable',
            'sec1_title' => 'string|max:255|nullable',
            'sec2_tagline' => 'string|max:50|nullable',
            'sec2_title' => 'string|max:255|nullable',
            'video_sec_title' => 'string|max:255|nullable',
            'video_sec_link' => 'string|max:255|url:http,https|nullable',
            'video_sec_btn_link' => 'string|max:255|url:http,https|nullable',
            'video_sec_btn_text' => 'required_with:video_sec_btn_link|string|max:20|nullable',
            'file' => 'image|dimensions:min_width=1320,min_height=324|nullable',
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
            'sec1_tagline' => 'Section 1 Tagline',
            'sec1_title' => 'Section 1 Title',
            'sec2_tagline' => 'Section 2 Tagline',
            'sec2_title' => 'Section 2 Title',
            'video_sec_title' => 'Video Title',
            'video_sec_link' => 'Video Url',
            'video_sec_btn_link' => 'Video Button Link',
            'video_sec_btn_text' => 'Video Button Text',
            'file' => 'Video Banner',
        ];
    }
}
