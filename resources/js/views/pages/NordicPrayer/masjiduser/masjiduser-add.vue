<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import modelData from "@/components/apis/modeldata";
import useReuseableData from "@/components/apis/reuseabledata";


const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();
const { allmasjid,get_allmasjid } = useReuseableData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Masjid admin');
let url_data = ref('masjiduser');
const backendurl = import.meta.env.VITE_BACKEND_URL;

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allmasjid();
});

const initialStateData = {
    masjid_id:'',
    name:'',
    email:'',
    phone:'',
    password:'',
    address:'',
    other_info:'',
    status:'active',
    prime_user:'no',
    permission:'',
};
const singledatapage = reactive({ ...initialStateData });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData)) {
         singledatapage[key] = value
      }
   }
};



</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / Add</h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Enter here to add data</h5>
               </div>
            </div>
         </div>
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
            <div id="DataTables_Table_0_filter" class="dataTables_filter">
               <RouterLink  :to="{name:'admin.'+url_data+'.list'}" class="btn btn-secondary btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-arrow-back-up-double me-md-2"></i><span class="d-md-inline-block d-none">Back to previous</span></span>
               </RouterLink>
            </div>
            <div class="invoice_status mb-3 mb-md-0"></div>
         </div>
         <br><br><br>
      </div>

      <form @submit.prevent="saveData()" class="card-body" enctype="multipart/form-data">
         <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
            <ul class="mb-0" style="font-family: 'Nunito';">
               <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>

         <div class="row g-3">


            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Masjid</label>
              <div class="input-group input-group-merge">
                <!-- <v-select style="width: 100%;" class="form-select" :options="['Canada', 'United States']"></v-select> -->
                <select v-model="singledatapage.masjid_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allmasjid" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
                <!-- <v-select
                    v-model="selectedCity"
                    :items="allCityNp"
                    item-text="name"
                    item-value="id"
                    label="--please select data--"
                    prepend-icon="mdi-map-marker"
                    style="width: 100%;"
                ></v-select> -->
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Name</label>
              <input type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Email</label>
              <input type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Phone</label>
              <input type="text" v-model="singledatapage.phone" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Password</label>
              <input type="text" v-model="singledatapage.password" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Address</label>
              <input type="text" v-model="singledatapage.address" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Other info</label>
              <input type="text" v-model="singledatapage.other_info" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Prime user</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.prime_user" class="form-select">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
              </div>
            </div>

         </div>
         <hr/>
         <div class="pt-4">
            <button type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light">
               {{ loadingBtn ? "Please wait" : "Submit" }}
            </button>
            <button type="reset" class="btn btn-label-secondary waves-effect">Reset</button>
         </div>
         <br/>
      </form>
   </div>
</div>
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>
