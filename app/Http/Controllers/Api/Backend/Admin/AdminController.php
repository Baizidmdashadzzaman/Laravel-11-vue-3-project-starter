<?php

namespace App\Http\Controllers\Api\Backend\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use App\Repositories\Admin\AdminInterface;
use Illuminate\Validation\Rule;

use App\Models\Admin;

class AdminController extends Controller
{

    protected $AdminInterface;

    public function __construct(AdminInterface $AdminInterface)
    {
        $this->AdminInterface = $AdminInterface;
    }


    public function index(): JsonResponse
    {
        $alldata = $this->AdminInterface->alldata($type='withpaginate',$withrelation=['role']);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function index_all(): JsonResponse
    {
        $alldata = $this->AdminInterface->alldata($type='withoutpaginate',$withrelation=['role']);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'email' => ['required','unique:users'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->AdminInterface->savedata($type='save',$request,$id='null');

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
        $alldata = $this->AdminInterface->singledata($id,$withrelation=['role']);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request,$id): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'email' => ['required',Rule::unique('users')->ignore($id)],
        ]);
        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }
        $save = $this->AdminInterface->savedata($type='update',$request,$id);

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
        if($id == 4){
            $statuscode = 201;
            $response = [
                'status' => false,
                'message' => "Sorry this user cant be deleted.",
            ];
            return response()->json($response, $statuscode);
        }
        else{
            $delete = $this->AdminInterface->deletedata($id,$withrelation=['role']);
            if($delete){
                $statuscode = 200;
                $response = [
                    'status' => true,
                    'message' => "Data deleted sccuessfully.",
                ];
            }
            else{
                $statuscode = 201;
                $response = [
                    'status' => false,
                    'message' => "Unable to delete data,please try again.",
                ];
            }
            return response()->json($response, $statuscode);
        }
    }

	public function search(Request $request): JsonResponse
	{
        $query = $request->get('search');
		if($request->get('search') == null){
            $alldata = $this->AdminInterface->alldata($type='withpaginate',$withrelation=['role']);
		}
		else{
            $alldata = $this->AdminInterface->searchdata($query,$type='withpaginate',$searchfield='email',$withrelation=['role']);
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
