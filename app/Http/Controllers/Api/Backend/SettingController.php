<?php

namespace App\Http\Controllers\Api\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use App\Repositories\Setting\Interfaces\SettingRepositoryInterface;
use Illuminate\Validation\Rule;

use App\Models\Setting;

class SettingController extends Controller
{
    protected $SettingRepository;

    public function __construct(SettingRepositoryInterface $SettingRepository)
    {
        $this->SettingRepository = $SettingRepository;
    }


    public function setting(): JsonResponse
    {
        $alldata = $this->SettingRepository->setting();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }



    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'site_name' => ['required'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->SettingRepository->updatedata($request);

        if($save){
            $statuscode = 200;
            $response = [
                'status' => true,
                'message' => "Data updated successfully.",
            ];
        }
        else{
            $statuscode = 400;
            $response = [
                'status' => false,
                'message' => "Unable to updated data , please try again.",
            ];
        }
        return response()->json($response, $statuscode);
    }



}
