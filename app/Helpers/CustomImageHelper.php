<?php

namespace App\Helpers;

use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;

class CustomImageHelper
{

    private static $image;
    private static $image_type;

    /**
     * Handle image related operations
     */
    public static function resizeImage($sourcePath, $width = 500, $height = 500, $disk = 'public')
    {
        $resizeImagePath = $sourcePath;
        if (Storage::disk($disk)->exists($sourcePath)) {
            $explodeSourcePath = explode('/', $sourcePath);
            $imagePath = '';
            $fileName = $sourcePath;
            $count = count($explodeSourcePath);
            if ($count > 1) {
                $fileName = end($explodeSourcePath);
                unset($explodeSourcePath[$count - 1]);
                $imagePath = implode('/', $explodeSourcePath);
            }
            $resizeFolder = $width . 'x' . $height;
            $destinationPath = ($imagePath) ? $imagePath . '/' . $resizeFolder : $resizeFolder;
            $resizeImagePath = $destinationPath . '/' . $fileName;

            if (!Storage::disk($disk)->exists($resizeImagePath)) {
                if (!Storage::disk($disk)->exists($destinationPath)) {
                    Storage::disk($disk)->makeDirectory($destinationPath);
                }

                $absoluteSourcePath = Storage::disk($disk)->path($sourcePath);
                $absoluteDestinationPath = Storage::disk($disk)->path($resizeImagePath);

                // $img = Image::imagick()->read($absoluteSourcePath);
                // $img->resizeDown($width, $height)->save($absoluteDestinationPath, quality: 100, progressive: true);

                (new self)->load($absoluteSourcePath);
                (new self)->resize($width, $height);
                (new self)->save($absoluteDestinationPath);
            }
        }
        return $resizeImagePath;
    }

    public static function getResizeImage($sourcePath, $width, $height, $disk = 'public')
    {
        $imageUrl = '';
        $resizeImagePath = self::resizeImage($sourcePath, $width, $height);
        if (Storage::disk($disk)->exists($resizeImagePath)) {
            $imageUrl = Storage::url($resizeImagePath);
        }
        return $imageUrl;
    }

    public static function deleteImages(string $sourcePath, string $disk = 'public')
    {
        if (Storage::disk($disk)->exists($sourcePath)) {
            Storage::disk($disk)->delete($sourcePath);
            $explodeSourcePath = explode('/', $sourcePath);
            $count = count($explodeSourcePath);
            if ($count > 1) {
                $fileName = end($explodeSourcePath);
                unset($explodeSourcePath[$count - 1]);
                $imagePath = implode('/', $explodeSourcePath);
                $directories = Storage::disk($disk)->directories($imagePath);
                foreach ($directories as $dir) {
                    $subDirPath =  $dir . '/' . $fileName;
                    if (Storage::disk($disk)->exists($subDirPath)) {
                        Storage::disk($disk)->delete($subDirPath);
                    }
                }
            }
        }
    }

    function load($filename)
    {

        $image_info = getimagesize($filename);
        self::$image_type = $image_info[2];
        if (self::$image_type == IMAGETYPE_JPEG) {

            self::$image = imagecreatefromjpeg($filename);
        } elseif (self::$image_type == IMAGETYPE_GIF) {

            self::$image = imagecreatefromgif($filename);
        } elseif (self::$image_type == IMAGETYPE_PNG) {

            self::$image = imagecreatefrompng($filename);
        }
    }

    function save($filename, $compression = 100, $permissions = null)
    {

        if (self::$image_type == IMAGETYPE_JPEG) {
            imagejpeg(self::$image, $filename, $compression);
        } elseif (self::$image_type == IMAGETYPE_GIF) {

            imagegif(self::$image, $filename);
        } elseif (self::$image_type == IMAGETYPE_PNG) {

            imagepng(self::$image, $filename);
        }
        if ($permissions != null) {

            chmod($filename, $permissions);
        }
    }

    function getWidth()
    {
        return imagesx(self::$image);
    }

    function getHeight()
    {
        return imagesy(self::$image);
    }

    function resizeToHeight($height)
    {
        $ratio = $height / $this->getHeight();
        $width = $this->getWidth() * $ratio;
        $this->resize($width, $height);
    }

    function resizeToWidth($width)
    {
        $ratio = $width / $this->getWidth();
        $height = $this->getheight() * $ratio;
        $this->resize($width, $height);
    }

    function scale($scale)
    {
        $width = $this->getWidth() * $scale / 100;
        $height = $this->getheight() * $scale / 100;
        $this->resize($width, $height);
    }

    function resize($width, $height)
    {
        $new_image = imagecreatetruecolor($width, $height);
        imagecopyresampled($new_image, self::$image, 0, 0, 0, 0, $width, $height, $this->getWidth(), $this->getHeight());
        self::$image = $new_image;
    }
}
