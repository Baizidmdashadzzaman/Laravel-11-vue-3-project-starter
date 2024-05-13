<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import usemodelData from "@/components/apis/modelData";
import { useToast } from "vue-toastification";
import api from '@/components/apis/api'

const toast = useToast();

const { validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,loading,getResultAll } = useDataCall();
const { state_role, } = usemodelData();

const emit = defineEmits(['changeActive'])
const route = useRoute();
let pagename = ref('Role');
let url_data = ref('role');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  getSingleData(route.params.id);
  getPermissionListByRole();
});


const singledatapage = reactive({ ...state_role });

watch(singledata, async (newdata, olddata) => {
   for (const [key, value] of Object.entries(newdata)) {
      singledatapage[key] = value
   }
})

let alldata_permission = ref([]);
const getPermissionListByRole = async () => {
    const datapro = await getResultAll('/role/role-permission-list/'+route.params.id)
    alldata_permission.value = datapro.permission_list;
    loading.value = false;
};

const addPermissionToRole = async (permission_id) => {
        const config ={ headers: { 'content-type': 'multipart/form-data' } }
        let formData = new FormData();
        formData.append('role_id', route.params.id);
        formData.append('permission_id', permission_id);
        await api().post('/role/role-permission-update',formData,config).then((response) => {
            toast.info(response.data.message);
            getPermissionListByRole();
        });
};

</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / Permission</h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Add permission to role:<b>{{ singledatapage.name }}</b></h5>
               </div>
            </div>
         </div>
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
            <div id="DataTables_Table_0_filter" class="dataTables_filter">
               <RouterLink  :to="{name:'admin.'+url_data+'.list'}" class="btn btn-secondary btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-arrow-back-up-double me-md-2"></i><span class="d-md-inline-block d-none">Back to previous</span></span>
               </RouterLink>
            </div>
            <div class="invoice_status mb-3 mb-md-0"></div>
         </div>
         <br><br><br>
      </div>

      <div class="table-responsive text-nowrap border-bottom">
           <table class="table table-hover ">
              <thead>
                 <tr>
                    <th>Sl</th>
                    <th>Permission</th>
                    <th>Add</th>
                 </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                 <tr v-for="(singledata,index) in alldata_permission" :key="singledata.id">
                    <td>
                       <strong >{{ index+1 }}</strong>
                    </td>
                    <td><b>{{ singledata.name }}</b></td>
                    <td>
                       <div class="btn-group" role="group">
                            <div class="form-check form-switch mb-2">
                              <input @click="addPermissionToRole(singledata.id)" :checked="singledata.added_to_role == 'yes'?(true):(false)" class="form-check-input" type="checkbox" :id="'flexSwitchCheckDefault'+singledata.id" >
                            </div>
                       </div>
                    </td>
                 </tr>
              </tbody>
           </table>
      </div>
      <LoadingDiv v-if="loading" />
   </div>

</div>
</template>
