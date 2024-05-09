<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import modelData from "@/components/apis/modeldata";
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";
import { useRouter, useRoute } from 'vue-router';

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();
const { allmasjid,get_allmasjid } = useReuseableData();

const { initialStateData_salattime, } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Salah time add');
let url_data = ref('salahtime');
const backendurl = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allmasjid();
  singledatapage.masjid_id = route.params.id;
});


const singledatapage = reactive({ ...initialStateData_salattime });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData_salattime)) {
         singledatapage[key] = value
      }
      singledatapage.masjid_id = route.params.id;
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
               <RouterLink  :to="{name:'admin.'+url_data+'.list', params: { id: route.params.id }}" class="btn btn-secondary btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-arrow-back-up-double me-md-2"></i><span class="d-md-inline-block d-none">Back to previous</span></span>
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
                <select disabled v-model="singledatapage.masjid_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allmasjid" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Excel file</label>
              <input type="text" v-model="singledatapage.excel_file" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah day</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.salah_day" class="form-select">
                    <option value="">select day</option>
                    <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah month</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.salah_month" class="form-select">
                    <option value="">select month</option>
                    <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah year</label>
              <input type="text" v-model="singledatapage.salah_year" class="form-control" placeholder="enter here">
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
            <hr/>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah fajr</label>
              <input type="text" v-model="singledatapage.salah_fajr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah dhuhr</label>
              <input type="text" v-model="singledatapage.salah_dhuhr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah asr</label>
              <input type="text" v-model="singledatapage.salah_asr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah magrib</label>
              <input type="text" v-model="singledatapage.salah_magrib" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Salah isha</label>
              <input type="text" v-model="singledatapage.salah_isha" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Sun rise</label>
              <input type="text" v-model="singledatapage.sun_rise" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Sun set</label>
              <input type="text" v-model="singledatapage.sun_set" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Shuruq time</label>
              <input type="text" v-model="singledatapage.shuruq_time" class="form-control" placeholder="enter here">
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
