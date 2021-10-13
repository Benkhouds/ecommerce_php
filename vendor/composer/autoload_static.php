<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitab841f510002fbdbd1adde945ed6a1fe
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitab841f510002fbdbd1adde945ed6a1fe::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitab841f510002fbdbd1adde945ed6a1fe::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitab841f510002fbdbd1adde945ed6a1fe::$classMap;

        }, null, ClassLoader::class);
    }
}
