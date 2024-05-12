<?php

namespace App\Http\Controllers\Api\Backend\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use App\Repositories\Role\RoleInterface;
use Illuminate\Validation\Rule;

use App\Models\Role;

class RoleController extends Controller
{

    protected $RoleInterface;

    public function __construct(RoleInterface $RoleInterface)
    {
        $this->RoleInterface = $RoleInterface;
    }


    public function index(): JsonResponse
    {
        $alldata = $this->RoleInterface->alldata($type='withpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function index_all(): JsonResponse
    {
        $alldata = $this->RoleInterface->alldata($type='withoutpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required','unique:roles'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->RoleInterface->savedata($type='save',$request,$id='null');

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
        $alldata = $this->RoleInterface->singledata($id,$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request,$id): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required',Rule::unique('roles')->ignore($id)],
        ]);
        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }
        $save = $this->RoleInterface->savedata($type='update',$request,$id);

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
        $delete = $this->RoleInterface->deletedata($id,$withrelation=null);
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
            $alldata = $this->RoleInterface->alldata($type='withpaginate',$withrelation=null);
		}
		else{
            $alldata = $this->RoleInterface->searchdata($query,$type='withpaginate',$searchfield='name',$withrelation=null);
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
