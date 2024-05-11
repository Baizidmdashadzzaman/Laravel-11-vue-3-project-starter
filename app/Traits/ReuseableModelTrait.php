<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait ReuseableModelTrait {

    /**
     * @param Request $request
     * @return $this|false|string
     */

    public function alldatatrait($model,$type,$withrelation){
        $alldata = $model::latest();
        if($withrelation != null){
            $alldata =$alldata->with($withrelation);
        }
        // if($status != null){
        //     $alldata =$alldata->whereStatus($status);
        // }
        if($type == 'withpaginate'){
            $alldata =$alldata->paginate(20);
        }
        else{
            $alldata =$alldata->get();
        }
        return $alldata;
    }

    public function alldatabasetrait($model,$type,$withrelation,$status){
        $alldata = $model::latest();
        if($withrelation != null){
            $alldata =$alldata->with($withrelation);
        }
        if($status != null){
            $alldata =$alldata->whereStatus($status);
        }
        return $alldata;
    }


    public function singledatatrait($model,$id,$withrelation){
        $alldata =  $model::find($id);
        if($withrelation != null){
            $alldata =$alldata->with($withrelation)->find($id);;
        }
        return $alldata;
    }

    public function searchdatatrait($model,$query,$type,$searchfield,$withrelation,$status){
        $alldata =  $model::where($searchfield, 'LIKE', "%{$query}%")->latest();
        if($withrelation != null){
            $alldata =$alldata->with($withrelation);
        }
        if($status != null){
            $alldata =$alldata->whereStatus($status);
        }
        if($type == 'withpaginate'){
            $alldata =$alldata->paginate(20);
        }
        else{
            $alldata =$alldata->get();
        }
        return $alldata;
    }

}
