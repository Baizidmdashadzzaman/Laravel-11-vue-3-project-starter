<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import usemodelData from "@/components/apis/modelData";

const { state_brand, } = usemodelData();

const { validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,loading } = useDataCall();

const emit = defineEmits(['changeActive'])
const route = useRoute();
let pagename = ref('Brand');
let url_data = ref('brand');


const singledatapage = reactive({ ...state_brand });

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  getSingleData(route.params.id);
});

watch(singledata, async (newdata, olddata) => {
   for (const [key, value] of Object.entries(newdata)) {
      singledatapage[key] = value
   }
   singledatapage.image = '';
   singledatapage.image_show = newdata.image;
   singledatapage.banner = '';
   singledatapage.banner_show = newdata.banner;
})


</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / Edit</h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Enter here to edit data</h5>
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

      <form @submit.prevent="updateData(route.params.id,singledatapage)" class="card-body" enctype="multipart/form-data">
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
              <label class="form-label" for="multicol-username">Name(Bn)</label>
              <input type="text" v-model="singledatapage.name_bn" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Image</label>
              <input type="file" @change="singledatapage.image = $event.target.files[0]" ref="file" class="form-control" placeholder="enter here">
              <img :src="$backendurl+'/resources/brand/'+singledatapage.image_show" style="width:150px;border-radius: 5px;">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Banner</label>
              <input type="file" @change="singledatapage.banner = $event.target.files[0]" ref="file" class="form-control" placeholder="enter here">
              <img :src="$backendurl+'/resources/brand/'+singledatapage.banner_show" style="width:150px;border-radius: 5px;">
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
               {{ loadingBtn ? "Please wait" : "Update" }}
            </button>
            <button type="reset" class="btn btn-label-secondary waves-effect">Reset</button>
         </div>
      </form>
      <LoadingDiv v-if="loading" />
   </div>

</div>
</template>
