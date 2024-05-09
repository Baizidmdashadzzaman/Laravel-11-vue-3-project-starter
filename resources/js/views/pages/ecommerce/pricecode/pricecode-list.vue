<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import api from "@/components/apis/api";

const { alldata,loading,urlcall,getResults,searchResults,dataDelete} = useDataCall();

const emit = defineEmits(['changeActive'])
let pagename = ref('Price code');
let url_data = ref('pricecode');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  getResults();
});

let alldataLetter = ref([]);
let characters = ref([]);
let submitBtn = ref(false);

watch(alldata, async (newdata, olddata) => {
   let x = 0
   for ( x in newdata) {
      alldataLetter[x] = newdata[x].letter;
   }
   characters.value = Object.values(alldataLetter);
})

let updateData = async () =>{

  submitBtn.value = true;
  const config = { headers: { 'content-type': 'multipart/form-data' }}
  await api().post('/'+urlcall.value+'/update-pricecode',characters,config).then(({data})=>{
      Swal.fire({
          title: 'Success',
          text: data.message,
          icon: 'success',
          confirmButtonColor: '#28c76f',
          confirmButtonText: 'Close',
      })
      getResults();
  }).catch(({response})=>{
      Swal.fire({
          title: 'Somthing went wrong',
          text: response.data.message,
          icon: 'warning',
          confirmButtonColor: '#28c76f',
          confirmButtonText: 'Close',
      })
  }).finally(()=>{
     submitBtn.value = false;
  })
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

                  <form @submit.prevent="updateData()" class="card-body" enctype="multipart/form-data">

                  <div class="row ms-2 me-3 b">
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                        <div class="dataTables_length" id="DataTables_Table_0_length"></div>
                        <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                           <div class="dt-buttons btn-group flex-wrap">
                              <h5 class="card-header" style="padding-left: 0px;">{{ pagename }} list</h5>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
                        <div id="DataTables_Table_0_filter" class="dataTables_filter">
                           <button type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light">
                              <span><i class="ti ti-edit-circle me-md-2"></i><span class="d-md-inline-block d-none">{{ submitBtn ? "Please wait" : "Update" }}</span></span>
                           </button>
                        </div>
                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                     <br><br><br>
                  </div>

                  <div class="border-bottom" style="padding: 20px;">
                     <div class="row g-3" v-for="(singledata,index) in alldata" :key="singledata.id">
                                 <div class="col-md-6">
                                   <label class="form-label" for="multicol-username">Number</label>
                                   <input type="text" :value="singledata.number" class="form-control" readonly>
                                 </div>
                                 <div class="col-md-6">
                                    <label class="form-label" for="multicol-username">Letter</label>
                                    <input class="form-control" type="text"
                                     name="alldataLetter[]" v-model="characters[index]" required >
                                 </div>
                              </div>
                  </div>
                  <br/>

                  </form>

                  <div class="row mx-2">
                  </div>
                  <LoadingDiv v-if="loading" />
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
