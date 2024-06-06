<?php

namespace App\Http\Controllers;

use App\Http\Requests\HomeSectionPostRequest;
use App\Models\HomeSection;
use App\Helpers\CustomImageHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $homeSection = HomeSection::first();
        if (empty($homeSection)) {
            $homeSection = HomeSection::create([
                'sec1_tagline' => 'Tagline',
            ]);
        }
        return Inertia::render('Admin/HomeSection', [
            'homeSection' => $homeSection,
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
    public function show(HomeSection $homeSection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomeSection $homeSection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HomeSectionPostRequest $request, HomeSection $homeSection): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('file')) {
            if (isset($homeSection->video_sec_banner)) {
                if (!empty($homeSection->video_sec_banner)) {
                    CustomImageHelper::deleteImages($homeSection->video_sec_banner);
                }
            }
            $path = Storage::disk('public')->put('home_section', $request->file('file'));
            $validated['video_sec_banner'] = $path;
        }
        $homeSection->update($validated);
        session()->put('status', 'Record successfully updated.');
        return redirect(route('home-section.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeSection $homeSection)
    {
        //
    }
}
