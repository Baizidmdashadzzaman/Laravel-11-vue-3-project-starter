<?php

namespace App\Http\Controllers\Api\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Auth;
use Hash;
use Validator;

use App\Models\{
    Authorityposttype,Shadaronjonogonpost,Bongobondhucornerpost,Live,Shadaronjonogonposttype,
    Division,City,Shongshodashon,Upazila,Union
};

class FrontendController extends Controller
{

    public function shadaronjonogon_post_type(): JsonResponse
    {
        $alldata = Shadaronjonogonposttype::where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function authority_post_type(): JsonResponse
    {
        $alldata = Authorityposttype::where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function division_list(): JsonResponse
    {
        $alldata = Division::where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function city_list_division_wise($aztoken,$id): JsonResponse
    {
        $alldata = City::where('division_id',$id)->where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function shongshodashon_list_city_wise($aztoken,$id): JsonResponse
    {
        $alldata = Shongshodashon::where('city_id',$id)->where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function upazila_list_shongshodashon_wise($aztoken,$id): JsonResponse
    {
        $alldata = Upazila::where('shongshodashon_id',$id)->where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function union_list_upazila_wise($aztoken,$id): JsonResponse
    {
        $alldata = Union::where('upazila_id',$id)->where('status','active')->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    ///////////////bongobondhucorner start/////////////
    public function bongobondhucorner_post_type(): JsonResponse
    {
        $alldata = array('information','news','documentary','speech','bookpdf');
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function bongobondhucorner_post_resource_type(): JsonResponse
    {
        $alldata = array('image', 'video' ,'videolink','pdf');
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function bongobondhucorner_post_all(): JsonResponse
    {
        $alldata = Bongobondhucornerpost::where('status','active')->latest()->paginate(20);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function bongobondhucorner_post_type_wise($aztoken,$type): JsonResponse
    {
        $alldata = Bongobondhucornerpost::
                     where('status','active')
                   ->where('post_type',$type)
                   ->latest()->paginate(20);
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function bongobondhucorner_post_view($aztoken,$posttypeid): JsonResponse
    {
        $alldata = Bongobondhucornerpost::where('status','active')
                                         ->whereId($posttypeid)
                                         ->with('bongobondhucornerpostresource', function ($query) {
                                            $query->where('status','active');
                                         })
                                         ->first();
        if($alldata == null)
        {
            $response = [
                'status' => true,
                'message' => "Unable to find data , please try again.",
            ];
            return response()->json($response, 404);
        }
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    ///////////////bongobondhucorner end/////////////


}
