<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";
import api from "@/components/apis/api";


const { alldata,getResults,searchResults,validationErrors,urlcall,pageid,loadingBtn,getSingleDataCutomUrl,singledata,updateData,loading,getResultAll,exportData,importData } = useDataCall();
const { allcountry,get_allcountry,allcitynp,get_allcity_countrywise,alllanguage,get_alllanguage } = useReuseableData();

const { initialStateData_masjid,initialStateData_salattime_import } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Salah time');
let url_data = ref('salahtime');
const backendurl = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();

onMounted(() => {
  const idc = route.params.id;
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  pageid.value = idc;
  getResultsByID();
  getSingleDataCutomUrl(route.params.id,'masjid');
  get_allcountry();
  get_alllanguage();
  singledataimport.masjid_id = route.params.id;
});

function getResultsByID(page) {
    loading.value = true;
     if (typeof page === 'undefined') {
         page = 1;
     }
    api().get('/'+urlcall.value+'/list-all-id-wise/'+route.params.id+'?page=' + page)
    .then((response) => {
        loading.value = false;
        alldata.value = response.data.alldata;
    });
}


const singledatapage = reactive({ ...initialStateData_masjid });

watch(singledata, async (newdata, olddata) => {
   for (const [key, value] of Object.entries(newdata)) {
      singledatapage[key] = value
   }
   singledatapage.logo = '';
   singledatapage.logo_show = newdata.logo;
   await get_allcity_countrywise(singledatapage.country_id);
})



const onChangeCountry = async (e) => {
   singledatapage.city_n_p_id = '';
   await get_allcity_countrywise(singledatapage.country_id);
};


function dataDelete(id, index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Deleted data cannot be retrive!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28c76f',
            cancelButtonColor: '#28c76f',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
              api().get('/'+urlcall.value+`/delete/${id}`)
             .then((response) => {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonColor: '#28c76f',
                    confirmButtonText: 'Close',
                })
                getResultsByID();
             })
             .catch((error) => {
               console.log(error.response.data);
             });
          }
        })
}


const singledataimport = reactive({ ...initialStateData_salattime_import });


const importDataMethod = async () => {
   await importData('/salahtime/import/'+route.params.id,singledataimport);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData_salattime_import)) {
        singledataimport[key] = value
      }
      singledataimport.masjid_id = route.params.id;
      getResultsByID();
   }
};


const onImageChange = (e) => {
    singledataimport.file = e.target.files[0];
};


</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / Salat time</h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;"><br/></h5>
               </div>
            </div>
         </div>
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
            <div id="DataTables_Table_0_filter" class="dataTables_filter">
               <RouterLink  :to="{name:'admin.'+url_data+'.list', params: { id: route.params.id }}" class="btn btn-secondary btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-arrow-back-up-double me-md-2"></i><span class="d-md-inline-block d-none">Back to previous</span></span>
               </RouterLink>
            </div>
            <div class="invoice_status mb-3 mb-md-0"></div>
         </div>
         <br><br><br>
      </div>

      <div  class="card-body">

         <div class="row g-3">
            <div class="col-md-2">
              <label class="form-label" for="multicol-email">Country</label>
              <div class="input-group input-group-merge">
                <select readonly disabled @change="onChangeCountry()" v-model="singledatapage.country_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allcountry" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <label class="form-label" for="multicol-email">City</label>
              <div class="input-group input-group-merge">
                <select readonly disabled v-model="singledatapage.city_n_p_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allcitynp" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-2">
              <label class="form-label" for="multicol-username">Name</label>
              <input readonly disabled type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
            </div>


            <div class="col-md-2">
              <label class="form-label" for="multicol-username">Phone</label>
              <input readonly disabled type="text" v-model="singledatapage.phone" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-2">
              <label class="form-label" for="multicol-username">Email</label>
              <input readonly disabled type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-2">
              <label class="form-label" for="multicol-username">Zip code</label>
              <input readonly disabled type="text" v-model="singledatapage.zip_code" class="form-control" placeholder="enter here">
            </div>

         </div>
      </div>
      <LoadingDiv v-if="loading" />
   </div>

</div>

<div class="">
   <div class="card mb-4">
      <form @submit.prevent="importDataMethod()" class="card-body" enctype="multipart/form-data" >

        <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
            <ul class="mb-0" style="font-family: 'Nunito';">
               <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>
         <div class="row g-3">
            <div class="col-md-6">
              <input type="file" @change="onImageChange" ref="file" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
               <button type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light d-grid w-100">
                  <span><i class="ti ti-database-import me-md-2 "></i><span class="d-md-inline-block d-none">{{ loadingBtn ? "Please wait" : "Import salahtime" }}</span></span>
               </button>
            </div>

            <div class="col-md-3">
                <button @click="exportData('/salahtime/export/'+route.params.id,'salahtime')"  class="btn btn-secondary btn-success d-grid w-100" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-database-export me-md-2"></i><span class="d-md-inline-block d-none">Export salahtime</span></span>
                </button>
            </div>
         </div>
      </form>
      <LoadingDiv v-if="loading" />
   </div>

</div>

<div style="margin-bottom: 100px;">
   <div class="row">
      <div class="col-lg-12">
         <div class="card h-100">
            <div class="table-responsive card-datatable">
               <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b">
                     <div class="card-header border-bottom">
                        <h5 class="card-title mb-3">Masjid salat time list</h5>
                        <div class="d-flex justify-content-between align-items-center row pb-2 gap-3 gap-md-0">
                           <div class="col-md-2 user_role"></div>
                           <div class="col-md-2 user_plan"></div>
                           <div class="col-md-2 user_status"></div>
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
                           <RouterLink  :to="{name:'admin.'+url_data+'.add', params: { id: route.params.id } }" class="btn btn-secondary btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-square-rounded-plus me-md-2"></i><span class="d-md-inline-block d-none">Add data</span></span>
                           </RouterLink>
                        </div>
                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Month</th>
                              <th>Day</th>
                              <th>Status</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                           <tr v-for="singledata in alldata.data" :key="singledata.id">
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.salah_month }}</b></td>
                              <td><b>{{ singledata.salah_day }}</b></td>
                              <td><span class="badge bg-label-success me-1" >{{ singledata.status }}</span></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <RouterLink :to="{ name: 'admin.'+url_data+'.edit', params: { id: singledata.id } }" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-edit me-md-2"></i>
                                    </RouterLink>
                                    <button @click.prevent="dataDelete(singledata.id, index)" type="button" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-square-rounded-x me-md-2"></i>
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
                                 @pagination-change-page="getResultsByID"
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
