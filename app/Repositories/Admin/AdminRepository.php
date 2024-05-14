<?php

namespace App\Repositories\Admin;
use App\Repositories\Admin\AdminInterface;
use App\Models\User;
use App\Traits\ReuseableModelTrait;

class AdminRepository implements AdminInterface{

    use ReuseableModelTrait;

    public function model()
    {
        $model = new User();
        return $model;
    }

    public function alldata($type,$withrelation){
        $alldata = $this->alldatatrait($model = $this->model(),$type,$withrelation);
        return $alldata;
    }

    public function savedata($type,$request,$id)
    {
        if($type == 'save'){
            $data = $this->model();
        }
        else{
            $data = $this->model()::find($id);;
        }
        $data->name = $request->name;
        $data->email = $request->email;
        if($request->password != null){
            $data->password = $request->password;
        }
        $data->access_token = $request->access_token;
        $data->access_token_status = $request->access_token_status ? $request->access_token_status : 'inactive';
        $data->status = $request->status ? $request->status : 'active';
        $data->role_id = $request->role_id;
        $save = $data->save();
        return $save;
    }

    public function singledata($id,$withrelation){
        $alldata =  $this->singledatatrait($model = $this->model(),$id,$withrelation);
        return $alldata;
    }

    public function deletedata($id,$withrelation){
        $alldata =  $this->singledatatrait($model = $this->model(),$id,$withrelation);
        $data =  $alldata->delete();
        return $data;
    }

    public function searchdata($query,$type,$searchfield,$withrelation){

        $alldata = $this->searchdatatrait($model = $this->model(), $query,$type,$searchfield,$withrelation,$status=null);
        return $alldata;
    }

}
