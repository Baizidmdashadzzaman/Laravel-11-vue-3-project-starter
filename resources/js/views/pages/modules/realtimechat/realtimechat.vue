
<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import usemodelData from "@/components/apis/modelData";
import useReuseableData from "@/components/apis/reuseabledata";
import api from "@/components/apis/api";
import {
  logout,userinfo,checkauth,authorized
} from '@/components/apis/auth';

const { alldata,getResults,searchResults,validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,
        loading,getResultAll,dataDelete,addingstatus
 } = useDataCall();


const { state_admin } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Realtime chat');
let url_data = ref('admin');

onMounted(() => {
  emit('changeActive', 'realtimechat')
  urlcall.value = url_data.value;
  getResults();
});



</script>
<template>
<div style="margin-bottom: 100px;">
   <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / list</h4>
   <div class="row">
      <div class="col-lg-12">
         <div class="card h-100">
            <div class="table-responsive card-datatable">
               <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b">
                     <div class="card-header border-bottom">
                        <h5 class="card-title mb-3">{{userinfo.id}}Chat realtime with other user</h5>
                        <div class="d-flex justify-content-between align-items-center row pb-2 gap-3 gap-md-0">
                           <div class="col-md-4 user_role"></div>
                           <div class="col-md-4 user_plan"></div>
                           <div class="col-md-4 user_status"></div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                        <div class="dataTables_length" id="DataTables_Table_0_length"></div>
                        <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                           <div class="dt-buttons btn-group flex-wrap">
                              <label>
                              <input @keyup="searchResults" type="search" class="form-control" placeholder="search here..." aria-controls="DataTables_Table_0" />
                              </label>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
                        <div id="DataTables_Table_0_filter" class="dataTables_filter"></div>
                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Role</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            <tr v-for="singledata in alldata.data" :key="singledata.id" >
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.role?.name }}</b></td>
                              <td><b>{{ singledata.name }}</b></td>
                              <td><b>{{ singledata.email }}</b></td>
                              <td><span class="badge bg-label-primary me-1" >{{ singledata.status }}</span></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <RouterLink :to="{ name: 'admin.realtimechat.chat', params: { id: singledata.id } }" class="btn btn-outline-primary btn-sm waves-effect waves-light">
                                       <i class="bx bx-conversation me-md-2"></i>
                                    </RouterLink>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br/>
                  <div class="row mx-2">
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite" >
                           Showing <font style="font-family: 'Nunito';">{{ alldata.data?.length }}</font> data
                        </div>
                     </div>
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                           <ul class="pagination pagination-sm">
                              <Bootstrap5Pagination
                                 :data="alldata"
                                 @pagination-change-page="getResults"
                                 limit="2"
                                 />
                           </ul>
                        </div>
                     </div>
                  </div>
                  <LoadingDiv v-if="loading" />
               </div>
            </div>
         </div>
      </div>
   </div>


</div>
</template>
