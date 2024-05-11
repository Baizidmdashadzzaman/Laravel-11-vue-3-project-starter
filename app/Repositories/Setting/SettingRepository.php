<?php

namespace App\Repositories\Setting;
use App\Repositories\Setting\SettingInterface;
use App\Models\Setting;
use App\Traits\ReuseableModelTrait;

class SettingRepository implements SettingInterface{

    use ReuseableModelTrait;

    public function model()
    {
        $model = new Setting();
        return $model;
    }

    public function setting(){
        $alldata = $this->model()::first();
        return $alldata;
    }

    public function updatedata($request)
    {
        $data = $this->model()::first();
        $data->site_name = $request->site_name;
        if($request->logo != null){
            $data->logo = time().'v1'. $_FILES["logo"]["name"];
        }
        if($request->logo_backend != null){
            $data->logo_backend = time().'v2'. $_FILES["logo_backend"]["name"];
        }
        if($request->favicon != null){
            $data->favicon = time().'v3'. $_FILES["favicon"]["name"];
        }
        $data->email = $request->email;
        $data->phone = $request->phone;
        $data->address = $request->address;
        $data->description = $request->description;
        $data->faq = $request->faq;
        $data->aboutus = $request->aboutus;
        $data->status = $request->status ? $request->status : 'active';
        $data->seo_keyword = $request->seo_keyword;
        $data->seo_description = $request->seo_description;
        $save = $data->update();

        if($request->logo != null){
            $source= $_FILES['logo']['tmp_name'];
            @mkdir("resources/setting");
            $destination="resources/setting/".$data->logo;
            $saveimage = move_uploaded_file($source,$destination);
        }
        if($request->logo_backend != null){
            $source= $_FILES['logo_backend']['tmp_name'];
            @mkdir("resources/setting");
            $destination="resources/setting/".$data->logo_backend;
            $saveimage = move_uploaded_file($source,$destination);
        }
        if($request->favicon != null){
            $source= $_FILES['favicon']['tmp_name'];
            @mkdir("resources/setting");
            $destination="resources/setting/".$data->favicon;
            $saveimage = move_uploaded_file($source,$destination);
        }

        return $save;
    }
}
