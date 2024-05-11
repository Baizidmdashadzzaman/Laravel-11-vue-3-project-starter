<?php

namespace App\Repositories\Aztoken;
use App\Repositories\Aztoken\AztokenInterface;
use App\Models\Aztoken;
use App\Traits\ReuseableModelTrait;

class AztokenRepository implements AztokenInterface{

    use ReuseableModelTrait;

    public function model()
    {
        $model = new Aztoken();
        return $model;
    }


    public function gettoken($aztoken_key){
        $alldata =  $this->model()::where('aztoken_key',$aztoken_key)->where('status','active')->first();
        return $alldata;
    }

    public function checktoken($aztoken){
        $alldata =  $this->model()::where('aztoken',$aztoken)->where('status','active')->first();
        return $alldata;
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
        $data->aztoken = $request->aztoken;
        $data->aztoken_key = $request->aztoken_key;
        $data->token_request = $request->token_request ? $request->token_request : 0;
        $data->aztoken_information = $request->aztoken_information;
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
