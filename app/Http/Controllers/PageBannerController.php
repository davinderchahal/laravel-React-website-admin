<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageBannerPostRequest;
use App\Models\PageBanner;
use App\Helpers\CustomImageHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PageBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/PageBanner', [
            'pageBanner' => PageBanner::first(),
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
    public function store(PageBannerPostRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image_one')) {
            $path = Storage::disk('public')->put('page_banner', $request->file('image_one'));
            $validated['about_banner'] = $path;
        }

        if ($request->hasFile('image_two')) {
            $path = Storage::disk('public')->put('page_banner', $request->file('image_two'));
            $validated['contact_banner'] = $path;
        }

        if ($request->hasFile('image_three')) {
            $path = Storage::disk('public')->put('page_banner', $request->file('image_three'));
            $validated['faqs_banner'] = $path;
        }

        PageBanner::create($validated);
        session()->put('status', 'Page Banner successfully created.');
        return redirect(route('page-banner.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(PageBanner $pageBanner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PageBanner $pageBanner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PageBannerPostRequest $request, PageBanner $pageBanner): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('image_one')) {
            if (isset($pageBanner->about_banner)) {
                if (!empty($pageBanner->about_banner)) {
                    CustomImageHelper::deleteImages($pageBanner->about_banner);
                }
            }
            $path = Storage::disk('public')->put('page_banner', $request->file('image_one'));
            $validated['about_banner'] = $path;
        }

        if ($request->hasFile('image_two')) {
            if (isset($pageBanner->contact_banner)) {
                if (!empty($pageBanner->contact_banner)) {
                    CustomImageHelper::deleteImages($pageBanner->contact_banner);
                }
            }
            $path = Storage::disk('public')->put('page_banner', $request->file('image_two'));
            $validated['contact_banner'] = $path;
        }

        if ($request->hasFile('image_three')) {
            if (isset($pageBanner->faqs_banner)) {
                if (!empty($pageBanner->faqs_banner)) {
                    CustomImageHelper::deleteImages($pageBanner->faqs_banner);
                }
            }
            $path = Storage::disk('public')->put('page_banner', $request->file('image_three'));
            $validated['faqs_banner'] = $path;
        }

        $pageBanner->update($validated);
        session()->put('status', 'Page Banner successfully updated.');
        return redirect(route('page-banner.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PageBanner $pageBanner)
    {
        //
    }
}
