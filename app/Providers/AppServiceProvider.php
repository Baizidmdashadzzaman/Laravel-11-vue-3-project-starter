<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\{
    Setting\SettingInterface,Setting\SettingRepository,
    Aztoken\AztokenInterface,Aztoken\AztokenRepository,
    Role\RoleInterface,Role\RoleRepository,
    Permission\PermissionInterface,Permission\PermissionRepository,
    Admin\AdminInterface,Admin\AdminRepository,
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
        $this->app->bind(RoleInterface::class,RoleRepository::class);
        $this->app->bind(PermissionInterface::class,PermissionRepository::class);
        $this->app->bind(AdminInterface::class,AdminRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
