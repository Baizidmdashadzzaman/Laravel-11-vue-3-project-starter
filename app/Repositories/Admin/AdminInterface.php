<?php

namespace App\Repositories\Admin;

Interface AdminInterface{

    public function alldata($type,$withrelation);
    public function savedata($type,$request,$id);
    public function singledata($id,$withrelation);
    public function deletedata($id,$withrelation);
    public function searchdata($query,$type,$searchfield,$withrelation);
}
