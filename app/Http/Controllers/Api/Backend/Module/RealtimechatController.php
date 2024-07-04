<?php

namespace App\Http\Controllers\Api\Backend\Module;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

use App\Models\Realtimechat;
use Illuminate\Http\Request;

use App\Events\MessageSent;

class RealtimechatController extends Controller
{

    public function model()
    {
        $model = new Realtimechat();
        return $model;
    }

    public function index($id): JsonResponse
    {
        $alldata = $this->model()::query()
        ->where(function($query) use ($id){
           $query->where('sender_id',auth()->id())
                 ->where('receiver_id',$id);
        })
        ->orWhere(function($query) use ($id){
           $query->where('sender_id',$id)
                 ->where('receiver_id',auth()->id());
        })
        ->with('sender','receiver')
        ->latest()
        ->get();

        $alldata = $alldata->map(function ($item) {
            $created = \Carbon\Carbon::createFromTimeStamp(strtotime($item->created_at));
              if($created->diffInYears(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%y year ago');
              }elseif($created->diffInMonths(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%m month ago');
              }elseif($created->diffInDays(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%d days ago');
              }elseif($created->diffInHours(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%h hours ago');
              }elseif($created->diffInMinutes(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%i minutes ago');
              }elseif($created->diffInSeconds(\Carbon\Carbon::now())>0){
                $cal_time = $created->diff(\Carbon\Carbon::now())->format('%s seconds ago');
              }else{
                $cal_time = "0 seconds ago";
              }
            $item['message_time'] = $cal_time;
            return $item;
        });

        $message = $alldata;
        broadcast(new MessageSent($message));

        $response = [
            'status' => true,
            'alldata' => $alldata,
        ];
        return response()->json($response, 200);
    }



    public function savedata($type,$request,$id)
    {
        if($type == 'save'){
            $data = $this->model();
        }
        else{
            $data = $this->model()::find($id);
        }

        $data->sender_id = $request->sender_id;
        $data->receiver_id = $request->receiver_id;
        $data->message = $request->message;

        $save = $data->save();
        return $save;
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(),[
            'message' => ['required'],
        ]);

        if($validator->fails()){
            $response = [
                'status' => false,
                'message' => $validator->errors(),
            ];
            return response()->json($response, 400);
        }

        $save = $this->savedata($type='save',$request,$id=null);

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



}
