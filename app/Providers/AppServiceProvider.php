<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\{
    Setting\SettingInterface,Setting\SettingRepository,
    Aztoken\AztokenInterface,Aztoken\AztokenRepository,
};


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SettingInterface::class,SettingRepository::class);
        $this->app->bind(AztokenInterface::class,AztokenRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
