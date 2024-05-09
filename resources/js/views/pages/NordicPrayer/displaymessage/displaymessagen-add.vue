<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import modelData from "@/components/apis/modeldata";
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";
import { useRouter, useRoute } from 'vue-router';

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();
const { allmasjid,get_allmasjid } = useReuseableData();

const { initialStateData_displaymessage, } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Display message');
let url_data = ref('displaymessage');
const backendurl = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allmasjid();
  singledatapage.masjid_id = route.params.id;
});


const singledatapage = reactive({ ...initialStateData_displaymessage });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData_displaymessage)) {
         singledatapage[key] = value
      }
      singledatapage.masjid_id = route.params.id;
   }
};

const onImageChange = (e) => {
   singledatapage.image = e.target.files[0];
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
              <label class="form-label" for="multicol-username">Title</label>
              <input type="text" v-model="singledatapage.title" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Title (lang)</label>
              <input type="text" v-model="singledatapage.title_lang" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Message type</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.message_type" class="form-select">
                     <option value="text">Text</option>
                     <option value="image">Image</option>
                     <option value="video">Video</option>
                     <option value="alert">Alert</option>
                     <option value="all">All</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Image</label>
              <input type="file" @change="onImageChange" ref="file" class="form-control" placeholder="enter here">
              <!-- <img :src="$backendurl+'/resources/displaymessage/'+singledatapage.image_show" style="width:150px;border-radius: 5px;"> -->
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Event</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.event_yes_no" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Start date</label>
              <input type="date" v-model="singledatapage.start_date" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">End date</label>
              <input type="date" v-model="singledatapage.expire_date" class="form-control" placeholder="enter here">
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

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Message</label>
              <textarea type="text" v-model="singledatapage.message" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Message (lang)</label>
              <textarea type="text" v-model="singledatapage.message_lang" class="form-control" placeholder="enter here"></textarea>
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
