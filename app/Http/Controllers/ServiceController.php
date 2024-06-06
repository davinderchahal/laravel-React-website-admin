<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServicePostRequest;
use App\Models\Service;
use App\Helpers\CustomImageHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Service/Index', [
            'services' => Service::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Service/AddEdit', [
            'service' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServicePostRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('file')) {
            $path = Storage::disk('public')->put('service', $request->file('file'));
            $validated['image'] = $path;
        }
        Service::create($validated);
        session()->put('status', 'Service successfully created.');
        return redirect(route('service.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service): Response
    {
        return Inertia::render('Admin/Service/AddEdit', [
            'service' =>  $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServicePostRequest $request, Service $service): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('file')) {
            if (isset($service->image)) {
                if (!empty($service->image)) {
                    CustomImageHelper::deleteImages($service->image);
                }
            }
            $path = Storage::disk('public')->put('service', $request->file('file'));
            $validated['image'] = $path;
        }
        $service->update($validated);
        session()->put('status', 'Service successfully updated.');
        return redirect(route('service.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service): RedirectResponse
    {
        if (isset($service->image)) {
            if (!empty($service->image)) {
                CustomImageHelper::deleteImages($service->image);
            }
        }
        $service->delete();
        session()->put('status', 'Service successfully deleted.');
        return redirect(route('service.index'));
    }
}
