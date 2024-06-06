<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Helpers\CustomImageHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $allBanner = Banner::first();
        if (empty($allBanner)) {
            $allBanner = Banner::create([
                'title' => 'Banner Title',
                'description' => 'Banner Description',
                'btn_text' => 'Button Text',
                'show_btn' => 1,
            ]);
        }

        return Inertia::render('Admin/Banner', [
            'banner' => $allBanner,
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
    public function show(Banner $banner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Banner $banner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'btn_text' => 'required|string|max:20',
            'btn_link' => 'required|string|max:255|url:http,https',
            'file' => 'image|dimensions:min_width=869,min_height=570|nullable',
        ]);

        $validated['show_btn'] = ($request->input('show_btn')) ? 1 : 0;
        if ($request->hasFile('file')) {
            if (isset($banner->image)) {
                if (!empty($banner->image)) {
                    CustomImageHelper::deleteImages($banner->image);
                }
            }
            $path = Storage::disk('public')->put('banners', $request->file('file'));
            $validated['image'] = $path;
        }
        $banner->update($validated);
        session()->put('status', 'Banner successfully updated.');
        return redirect(route('banners.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        //
    }
}
