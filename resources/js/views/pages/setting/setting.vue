<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";
import api from "@/components/apis/api";

const { validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,loading,getResultAll } = useDataCall();
const { setting,get_setting,allcountry,get_allcountry,allcitynp,get_allcity_countrywise,alllanguage,get_alllanguage } = useReuseableData();
const { initialStateData_setting, } = usemodelData();

const emit = defineEmits(['changeActive'])
const route = useRoute();
let pagename = ref('Setting');
let url_data = ref('setting');
const backendurl = import.meta.env.VITE_BACKEND_URL;

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_setting();
  loading.value = false;
});


const singledatapage = reactive({ ...initialStateData_setting });

watch(setting, async (newdata, olddata) => {
   for (const [key, value] of Object.entries(newdata)) {
      singledatapage[key] = value
   }
   singledatapage.logo = '';
   singledatapage.logo_show = newdata.logo;
   singledatapage.logo_backend = '';
   singledatapage.logo_backend_show = newdata.logo_backend;
   singledatapage.favicon = '';
   singledatapage.favicon_show = newdata.favicon;
})



const updateDataCustom = async () => {
        validationErrors.value = '';
        loadingBtn.value = true;
        loading.value = true;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        await api().post('/setting/update',singledatapage,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#28c76f',
                confirmButtonText: 'Close',
            })
            get_setting();
        }).catch(({response})=>{
            if(response.status===400){
                validationErrors.value = response.data.message;
            }
            if(response.status===404){
                validationErrors.value = response.data.message;
            }
        }).finally(()=>{
            loadingBtn.value = false;
            loading.value = false;
        })
};

const onlogoChange = (e) => {
   singledatapage.logo = e.target.files[0];
};
const onlogo_backendChange = (e) => {
   singledatapage.logo_backend = e.target.files[0];
};
const onfaviconChange = (e) => {
   singledatapage.favicon = e.target.files[0];
};


</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} </h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Update setting information</h5>
               </div>
            </div>
         </div>
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
            <div id="DataTables_Table_0_filter" class="dataTables_filter">

            </div>
            <div class="invoice_status mb-3 mb-md-0"></div>
         </div>
         <br><br><br>
      </div>

      <form @submit.prevent="updateDataCustom()" class="card-body" enctype="multipart/form-data">
         <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
            <ul class="mb-0" style="font-family: 'Nunito';">
               <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>

         <div class="row g-3">


            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Site name</label>
              <input type="text" v-model="singledatapage.site_name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Email</label>
              <input type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Phone</label>
              <input type="text" v-model="singledatapage.phone" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Address</label>
              <input type="text" v-model="singledatapage.address" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Logo</label>
              <input type="file" @change="onlogoChange" ref="file" class="form-control" placeholder="enter here">
              <img :src="$backendurl+'/resources/setting/'+singledatapage.logo_show" style="width:150px;border-radius: 5px;">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Logo backend</label>
              <input type="file" @change="onlogo_backendChange" ref="file" class="form-control" placeholder="enter here">
              <img :src="$backendurl+'/resources/setting/'+singledatapage.logo_backend_show" style="width:150px;border-radius: 5px;">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Favicon</label>
              <input type="file" @change="onfaviconChange" ref="file" class="form-control" placeholder="enter here">
              <img :src="$backendurl+'/resources/setting/'+singledatapage.favicon_show" style="width:150px;border-radius: 5px;">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Description</label>
              <textarea type="text" v-model="singledatapage.description" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Faq</label>
              <textarea type="text" v-model="singledatapage.faq" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">About us</label>
              <textarea type="text" v-model="singledatapage.aboutus" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Seo keyword</label>
              <textarea type="text" v-model="singledatapage.seo_keyword" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Seo description</label>
              <textarea type="text" v-model="singledatapage.seo_description" class="form-control" placeholder="enter here"></textarea>
            </div>


         </div>
         <hr/>
         <div class="pt-4">
            <button type="submit" class="btn btn-primary me-sm-3 me-1 waves-effect waves-light">
               {{ loadingBtn ? "Please wait" : "Update" }}
            </button>
            <button type="reset" class="btn btn-secondary waves-effect">Reset</button>
         </div>
      </form>
      <LoadingDiv v-if="loading" />
   </div>

</div>
</template>
