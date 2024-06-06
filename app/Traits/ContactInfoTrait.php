<?php

namespace App\Traits;

use App\Models\Contact;
use App\Models\Image;

trait ContactInfoTrait
{
    public static function getContactInfo()
    {
        $contactInfo = Contact::first();
        $raw = $formated = $email = $address = '';
        $social_media = array();
        if (isset($contactInfo)) {
            $email = $contactInfo->email;
            $address = $contactInfo->address;
            $social_media = $contactInfo->social_media;
            $raw = $contactInfo->phone;
            $formated = self::formatNumber($raw);
        }
        return array('formatedPhn' => $formated, 'rawPhn' => $raw, 'email' => $email, 'address' => $address, 'social_media' => $social_media);
    }

    public static function getPhoneNumber()
    {
        $contactInfo = Contact::first('phone');
        $raw = $formated = '';
        if (isset($contactInfo)) {
            $raw = $contactInfo->phone;
            $formated = self::formatNumber($raw);
        }
        return array('formatedPhn' => $formated, 'rawPhn' => $raw);
    }

    public static function formatNumber($phone)
    {
        $formated = '+1 (' . substr($phone, 0, 3) . ') ' . substr($phone, 3, 3) . ' ' . substr($phone, 6, 4);
        return $formated;
    }

    public static function getGallery()
    {
        return Image::limit(6)->inRandomOrder()->get();
    }
}
