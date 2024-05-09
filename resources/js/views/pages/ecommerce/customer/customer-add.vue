<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import usemodelData from "@/components/apis/modelData";

const { state_customer, } = usemodelData();

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();

const emit = defineEmits(['changeActive'])
let pagename = ref('Customer');
let url_data = ref('customer');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
});


const singledatapage = reactive({ ...state_customer });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(state_customer)) {
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

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Name</label>
              <input type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Code</label>
              <input type="text" v-model="singledatapage.code" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Email</label>
              <input type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Phone</label>
              <input type="text" v-model="singledatapage.phone" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Password</label>
              <input type="text" v-model="singledatapage.password" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Country</label>
              <input type="text" v-model="singledatapage.country" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Divison</label>
              <input type="text" v-model="singledatapage.divison" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">City</label>
              <input type="text" v-model="singledatapage.city" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Address</label>
              <input type="text" v-model="singledatapage.address" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Zip code</label>
              <input type="text" v-model="singledatapage.zipcode" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Contact info</label>
              <input type="text" v-model="singledatapage.contactinfo" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Verified</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.isverified" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Varification code</label>
              <input type="text" v-model="singledatapage.varification_code" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Access token</label>
              <input type="text" v-model="singledatapage.access_token" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Access token status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.access_token_status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

         </div>
         <div class="pt-4">
            <button type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light">
               {{ loadingBtn ? "Please wait" : "Submit" }}
            </button>
            <button type="reset" class="btn btn-label-secondary waves-effect">Reset</button>
         </div>
      </form>
   </div>
</div>
</template>
