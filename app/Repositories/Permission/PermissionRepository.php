<?php

namespace App\Repositories\Permission;
use App\Repositories\Permission\PermissionInterface;
use App\Models\Permission;
use App\Traits\ReuseableModelTrait;

class PermissionRepository implements PermissionInterface{

    use ReuseableModelTrait;

    public function model()
    {
        $model = new Permission();
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
        $data->status = $request->status ? $request->status : 'active';
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
