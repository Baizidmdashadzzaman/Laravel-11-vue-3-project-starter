<?php
namespace App\Http\Controllers\Api\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\{
    Aztoken,User,Setting,Role,Permission
};
use Rakibhstu\Banglanumber\NumberToBangla;

use App\Models\Ecommerce\{
    Category,Subcategory,Subsubcategory,
    Brand,Producttype,Origincountry,
    Product,Color,Size,Bondsize,Cupsize,
    Customer,Delivarycharge
};

class ReuseableController extends Controller
{

    public function role_list(): JsonResponse
    {
        $alldata = Role::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }


    public function delivarycharge_list(): JsonResponse
    {
        $alldata = Delivarycharge::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function search($id){
        $alldata =  Product::where('name', 'LIKE', "%{$id}%")
        ->with(['category','subcategory','subsubcategory','brand','producttype','origincountry'])
        ->latest()
        ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function customer_list(): JsonResponse
    {
        $alldata = Customer::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function product_list(): JsonResponse
    {
        $alldata = Product::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function color_list(): JsonResponse
    {
        $alldata = Color::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function size_list(): JsonResponse
    {
        $alldata = Size::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function bondsize_list(): JsonResponse
    {
        $alldata = Bondsize::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function cupsize_list(): JsonResponse
    {
        $alldata = Cupsize::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function brand_list(): JsonResponse
    {
        $alldata = Brand::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function producttype_list(): JsonResponse
    {
        $alldata = Producttype::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function origincountry_list(): JsonResponse
    {
        $alldata = Origincountry::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function category_list(): JsonResponse
    {
        $alldata = Category::where('status','active')
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function subcategory_list_category_wise($id): JsonResponse
    {
        $alldata = Subcategory::where('status','active')
                    ->where('category_id',$id)
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }
    public function subsubcategory_list_subcategory_wise($id): JsonResponse
    {
        $alldata = Subsubcategory::where('status','active')
                    ->where('subcategory_id',$id)
                    ->get();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }


 ///////////////////////////base/////////////////////
    public function setting(): JsonResponse
    {
        $alldata = Setting::first();
        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }

    public function dashboard_data(): JsonResponse
    {
        $numto = new NumberToBangla();

        $Appointment = 0;
        $Authoritypost = 0;
        $Authoritypostfeedback = 0;
        $Authorityposttype = 0;
        $Aztoken = Aztoken::count();
        $Bongobondhucornerpost = 0;
        $Bongobondhucornerpostresource = 0;
        $City = 0;
        $Division = 0;
        $Live = 0;
        $PasswordResetRequest = 0;
        $Shadaronjonogon = 0;
        $Shadaronjonogonpost = 0;
        $Shadaronjonogonpostfeedback = 0;
        $Shadaronjonogonposttype = 0;
        $Shongshodashon = 0;
        $Shongshodshodosho = 0;
        $Slider = 0;
        $Union = 0;
        $Unionchairmen = 0;
        $Upazila = 0;
        $Upazilakormotorta = 0;
        $Upazilakormotortatype = 0;
        $User = User::count();

        $response = [
            'status' => true,
            'Appointment' => $Appointment,
            'Authoritypost' => $Authoritypost,
            'Authoritypostfeedback' => $Authoritypostfeedback,
            'Authorityposttype' => $Authorityposttype,
            'Aztoken' => $Aztoken,
            'Bongobondhucornerpost' => $Bongobondhucornerpost,
            'Bongobondhucornerpostresource' => $Bongobondhucornerpostresource,
            'City' => $City,
            'Division' => $Division,
            'Live' => $Live,
            'PasswordResetRequest' => $PasswordResetRequest,
            'Shadaronjonogon' => $Shadaronjonogon,
            'Shadaronjonogonpost' => $Shadaronjonogonpost,
            'Shadaronjonogonpostfeedback' => $Shadaronjonogonpostfeedback,
            'Shadaronjonogonposttype' => $Shadaronjonogonposttype,
            'Shongshodashon' => $Shongshodashon,
            'Shongshodshodosho' => $Shongshodshodosho,
            'Slider' => $Slider,
            'Union' => $Union,
            'Unionchairmen' => $Unionchairmen,
            'Upazila' => $Upazila,
            'Upazilakormotorta' => $Upazilakormotorta,
            'Upazilakormotortatype' => $Upazilakormotortatype,
            'User' => $User,
        ];

        return response()->json($response, 200);
    }
 ///////////////////////////base/////////////////////


}
