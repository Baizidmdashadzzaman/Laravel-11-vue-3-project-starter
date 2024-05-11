<?php

namespace App\Repositories\Aztoken;

Interface AztokenInterface{

    public function alldata($type,$withrelation);
    public function savedata($type,$request,$id);
    public function singledata($id,$withrelation);
    public function deletedata($id,$withrelation);
    public function searchdata($query,$type,$searchfield,$withrelation);
    public function gettoken($aztoken_key);
    public function checktoken($aztoken);
}
