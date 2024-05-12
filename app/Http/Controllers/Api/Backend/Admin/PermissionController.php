<?php

namespace App\Http\Controllers\Api\Backend\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use App\Repositories\Permission\PermissionInterface;
use Illuminate\Validation\Rule;

use App\Models\Permission;

class PermissionController extends Controller
{

    protected $PermissionInterface;

    public function __construct(PermissionInterface $PermissionInterface)
    {
        $this->PermissionInterface = $PermissionInterface;
    }


    public function index(): JsonResponse
    {
        $alldata = $this->PermissionInterface->alldata($type='withpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function index_all(): JsonResponse
    {
        $alldata = $this->PermissionInterface->alldata($type='withoutpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required','unique:permissions'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->PermissionInterface->savedata($type='save',$request,$id='null');

        if($save){
            $statuscode = 200;
            $response = [
                'status' => true,
                'message' => "Data created successfully.",
            ];
        }
        else{
            $statuscode = 400;
            $response = [
                'status' => false,
                'message' => "Unable to create data , please try again.",
            ];
        }
        return response()->json($response, $statuscode);
    }


    public function edit($id): JsonResponse
    {
        $alldata = $this->PermissionInterface->singledata($id,$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request,$id): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required',Rule::unique('permissions')->ignore($id)],
        ]);
        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }
        $save = $this->PermissionInterface->savedata($type='update',$request,$id);

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
                'message' => "Unable to update data , please try again.",
            ];
        }
        return response()->json($response, $statuscode);
    }

    public function destroy($id): JsonResponse
    {
        $delete = $this->PermissionInterface->deletedata($id,$withrelation=null);
        if($delete){
            $statuscode = 200;
            $response = [
                'status' => true,
                'message' => "Data deleted sccuessfully.",
            ];
        }
        else{
            $statuscode = 400;
            $response = [
                'status' => false,
                'message' => "Unable to delete data,please try again.",
            ];
        }
        return response()->json($response, $statuscode);

    }

	public function search(Request $request): JsonResponse
	{
        $query = $request->get('search');
		if($request->get('search') == null){
            $alldata = $this->PermissionInterface->alldata($type='withpaginate',$withrelation=null);
		}
		else{
            $alldata = $this->PermissionInterface->searchdata($query,$type='withpaginate',$searchfield='name',$withrelation=null);
		}
        $statuscode = 200;
        $response = [
            'status' => true,
            'message' => "Search result found: " . $alldata->count(),
            'alldata' => $alldata,
        ];
        return response()->json($response, $statuscode);
	}



}
