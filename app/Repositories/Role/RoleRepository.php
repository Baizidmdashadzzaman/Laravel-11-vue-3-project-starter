<?php

namespace App\Repositories\Role;
use App\Repositories\Role\RoleInterface;
use App\Models\Role;
use App\Traits\ReuseableModelTrait;

class RoleRepository implements RoleInterface{

    use ReuseableModelTrait;

    public function model()
    {
        $model = new Role();
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
