<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Faq/Index', [
            'faqs' => Faq::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Faq/AddEdit', [
            'faq' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $validated['is_show'] = ($request->input('is_show')) ? 1 : 0;

        Faq::create($validated);
        session()->put('status', 'FAQ successfully created.');
        return redirect(route('faq.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq): Response
    {
        return Inertia::render('Admin/Faq/AddEdit', [
            'faq' => $faq,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $validated['is_show'] = ($request->input('is_show')) ? 1 : 0;

        $faq->update($validated);
        session()->put('status', 'FAQ successfully updated.');
        return redirect(route('faq.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();
        session()->put('status', 'FAQ successfully deleted.');
        return redirect(route('faq.index'));
    }
}
