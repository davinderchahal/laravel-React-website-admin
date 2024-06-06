<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $contactRec = Contact::first();
        if (empty($contactRec)) {
            $contactRec = Contact::create([
                'tagline' => 'Contact With Us',
            ]);
        }
        return Inertia::render('Admin/Contact', [
            'contact' => $contactRec,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact): RedirectResponse
    {
        $validated = Validator::make(
            $request->all(),
            [
                'tagline' => 'required|string|max:50',
                'title' => 'required|string|max:255',
                'description' => 'string|nullable',
                'phone' => 'required|digits:10',
                'email' => 'required|email|max:50',
                'address' => 'required|string|max:100',
                'social_media.facebook' => 'url:http,https|max:250|nullable',
                'social_media.insta' => 'url:http,https|max:250|nullable',
                'social_media.linkedin' => 'url:http,https|max:250|nullable',
                'social_media.twitter' => 'url:http,https|max:250|nullable',
                'social_media.youtube' => 'url:http,https|max:250|nullable',
            ],
            [],
            [
                'social_media.facebook' => 'Facebook Link',
                'social_media.insta' => 'Instagram Link',
                'social_media.linkedin' => 'Linkedin Link',
                'social_media.twitter' => 'Twitter Link',
                'social_media.youtube' => 'Youtube Link',
            ]
        )->validate();

        $contact->update($validated);
        session()->put('status', 'Contact successfully updated.');
        return redirect(route('contact.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
