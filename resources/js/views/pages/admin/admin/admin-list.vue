<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import usemodelData from "@/components/apis/modelData";
import useReuseableData from "@/components/apis/reuseabledata";
import api from "@/components/apis/api";

const { alldata,getResults,searchResults,validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,
        loading,getResultAll,dataDelete,addingstatus
 } = useDataCall();

const { allrole,get_allrole, } = useReuseableData();

const { state_admin } = usemodelData();


const emit = defineEmits(['changeActive'])
let pagename = ref('Admin');
let url_data = ref('admin');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  getResults();
  get_allrole();
});


let modal_btn = ref('Save');
let modal_title = ref('Add product stock');
let modal_show = ref(false);

const singledatapage = reactive({ ...state_admin });

const addDataModal = async () => {
    modal_btn.value = 'Save';
    modal_title.value = 'Add new data';
    modal_show.value = true;
    for (const [key, value] of Object.entries(state_admin)) {
         singledatapage[key] = value
    }
    singledatapage.id = '';
};
const closeDataModal = async () => {
    modal_show.value = false;
};


const storeData = async (formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        addingstatus.value = false;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        let urlForm = '';
        if(formdata.id === ''){ urlForm = '/admin/store'; }
        else{ urlForm = '/admin/update/'+formdata.id; }

        await api().post(urlForm,formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            })
            addingstatus.value = true;
            getResults();
            closeDataModal();
        }).catch(({response})=>{
            if(response.status===400){
                validationErrors.value = response.data.message;
            }
            if(response.status===404){
                validationErrors.value = response.data.message;
            }
            addingstatus.value = false;
        }).finally(()=>{
            loadingBtn.value = false;
        })
};


const editDataCustom = async (id) => {
   loading.value = true;
   await api().get('/'+urlcall.value+'/edit/' + id)
   .then((response) => {
       loading.value = false;
       singledatapage.id = id;
       for (const [key, value] of Object.entries(response.data.alldata)) {
          singledatapage[key] = value
       }
       modal_btn.value = 'Update';
       modal_title.value = 'Update product stock';
       modal_show.value = true;
   });
}


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
                        <h5 class="card-title mb-3">{{ pagename }}</h5>
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
                        <div id="DataTables_Table_0_filter" class="dataTables_filter">
                           <button @click="addDataModal" class="btn btn-secondary btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-square-rounded-plus me-md-2"></i><span class="d-md-inline-block d-none">Add data</span></span>
                           </button>
                        </div>
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
                           <tr v-for="singledata in alldata.data" :key="singledata.id">
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.role?.name }}</b></td>
                              <td><b>{{ singledata.name }}</b></td>
                              <td><b>{{ singledata.email }}</b></td>
                              <td><span class="badge bg-label-primary me-1" >{{ singledata.status }}</span></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click.prevent="editDataCustom(singledata.id, index)" type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light">
                                       <i class="bx bx-edit me-md-2"></i>
                                    </button>
                                    <button @click.prevent="dataDelete(singledata.id, index)" type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light">
                                       <i class="bx bx-trash-alt me-md-2"></i>
                                    </button>
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


   <div v-if="modal_show == true" class="modal"  style="display: block;background-color: #0b0b0b6b;">
        <div class="modal-dialog">
          <form @submit.prevent="storeData(singledatapage)" enctype="multipart/form-data" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="backDropModalTitle">{{ modal_title }}</h5>
              <button @click="closeDataModal" type="button" class="btn-close" ></button>
            </div>
            <hr/>
            <div class="modal-body">
              <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
                  <ul class="mb-0" style="font-family: 'Nunito';">
                     <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                  </ul>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <div class="">
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Role</label>
                  <select v-model="singledatapage.role_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allrole" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>

                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Name</label>
                  <input type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Email</label>
                  <input type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Password</label>
                  <input type="text" v-model="singledatapage.password" class="form-control" placeholder="enter here">
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Access token</label>
                  <textarea type="text" v-model="singledatapage.access_token" class="form-control" placeholder="enter here"></textarea>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Access token status</label>
                  <select v-model="singledatapage.access_token_status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Status</label>
                  <select v-model="singledatapage.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <hr/>
            <div class="modal-footer">
              <button @click="closeDataModal" type="button" class="btn btn-secondary waves-effect" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary waves-effect waves-light">
                 {{ loadingBtn ? "Please wait" : modal_btn }}
              </button>
            </div>
          </form>
        </div>
      </div>


</div>
</template>
