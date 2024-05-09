<?php

namespace App\Http\Controllers\Api\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use App\Repositories\Aztoken\Interfaces\AztokenRepositoryInterface;
use Illuminate\Validation\Rule;

class AztokenController extends Controller
{

    protected $AztokenRepository;

    public function __construct(AztokenRepositoryInterface $AztokenRepository)
    {
        $this->AztokenRepository = $AztokenRepository;
    }

    public function get_aztoken(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'aztoken_key' => ['required'],
        ]);
        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $alldata = $this->AztokenRepository->gettoken($request->aztoken_key);
        if($alldata==null){
            $response = ['status' => false,'aztoken' => '','message' => 'Access token not found , you are not authorized to use this api.',];
            return response()->json($response, 400);
        }

        $response = ['status' => true,'aztoken' => $alldata->aztoken,'message' => 'Access token found , you are authorized to use this api.',];
        return response()->json($response, 200);
    }

    public function index(): JsonResponse
    {
        $alldata = $this->AztokenRepository->alldata($type='withpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function index_all(): JsonResponse
    {
        $alldata = $this->AztokenRepository->alldata($type='withoutpaginate',$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'aztoken' => ['required','unique:aztokens'],
            'aztoken_key' => ['required','unique:aztokens'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->AztokenRepository->savedata($type='save',$request,$id='null');

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
        $alldata = $this->AztokenRepository->singledata($id,$withrelation=null);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request,$id): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'aztoken' => ['required',Rule::unique('aztokens')->ignore($id)],
            'aztoken_key' => ['required',Rule::unique('aztokens')->ignore($id)],
        ]);
        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }
        $save = $this->AztokenRepository->savedata($type='update',$request,$id);

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
        $delete = $this->AztokenRepository->deletedata($id,$withrelation=null);
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
            $alldata = $this->AztokenRepository->alldata($type='withpaginate',$withrelation=null);
		}
		else{
            $alldata = $this->AztokenRepository->searchdata($query,$type='withpaginate',$searchfield='aztoken_key',$withrelation=null);
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
