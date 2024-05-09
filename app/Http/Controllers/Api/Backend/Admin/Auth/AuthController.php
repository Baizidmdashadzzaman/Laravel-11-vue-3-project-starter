<?php

namespace App\Http\Controllers\Api\Backend\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Auth;
use Hash;
use Validator;
use App\Http\Requests\AuthRequest;

class AuthController extends Controller
{

    public function userinfo(): JsonResponse
    {
        $user = auth()->user();
        $response = [
            'status' => true,
            'user' => $user,
        ];
        return response()->json($response, 200);
    }

    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'confirmed' => ['required', 'string', 'min:8', 'same:password'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $usertoken = $user->createToken('Mymp', ['usertype:admin'])->plainTextToken;

        if($user){
            $response = [
                'status'  => true,
                'message' => "Register successfully done.",
                'user'    => $user,
                'usertoken'    => $usertoken,
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'status' => false,
                'message' => "Unable to register, please try again.",
            ];
            return response()->json($response, 400);
        }
    }

    public function authenticate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6',
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        if (Auth::guard('web')->attempt(['email' => $request['email'], 'password' => $request['password']], $request['remember'])) {
            $user = Auth::guard('web')->user();
            $usertoken = $user->createToken('Mymp',['usertype:admin'])->plainTextToken;
            $response = [
                'status'  => true,
                'message' => "Login successfully done.",
                'user'    => $user,
                'usertoken'    => $usertoken,
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'status' => false,
                'message' => "Invalid credentials, please try again.",
            ];
            return response()->json($response, 400);
        }
    }

    public function authenticateQR(Request $request): JsonResponse
    {

        $user = User::where('access_token',$request['access_token'])->first();
        if($user != null){
          if($user->access_token_status == 0){
              return response()->json(['message' => 'You access code is not active , please active to use it.'],401);
          }
          if($user->primeuser != 1){
            if($user->status == 0){
                return response()->json(['message' => 'You are not active , please contact admin to active your account.'],401);
            }
          }
        }
        if ($user != null) {
            auth()->login($user);
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json(['data' => $user]);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 400);
        }
    }



    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();
        $logout = $request->user()->currentAccessToken()->delete();
        if( $logout){
            $response = [
                'status' => true,
                'message' => "User logout successfully.",
            ];
            return response()->json($response, 200);
        }else{
            $response = [
                'status' => false,
                'message' => "Unable to logout, please try again.",
            ];
            return response()->json($response, 400);
        }

    }


}
