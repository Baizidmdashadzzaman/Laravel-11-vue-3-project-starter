<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import usemodelData from "@/components/apis/modelData";

import { useGetGenerativeModelGP } from './useGetGenerativeModelGP.js'
import AIAnswer from './AIAnswer.vue'

const question = ref('')
const answer = ref('')
const isLoading = ref(false)

const fetchAnswer = async () => {
  answer.value = ''
  isLoading.value = true

  try {
    answer.value = await useGetGenerativeModelGP(question.value)
  } catch (error) {
    console.log({ error })
  } finally {
    isLoading.value = false
    question.value = ''
  }
}

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();
const { initialStateData_aztoken, } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('AI chat');
let url_data = ref('aichat');
const backendurl = import.meta.env.VITE_BACKEND_URL;

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
});


const singledatapage = reactive({ ...initialStateData_aztoken });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData_aztoken)) {
         singledatapage[key] = value
      }
   }
};


</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }}</h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Chat with AI</h5>
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


<form class="card-body" enctype="multipart/form-data" @submit.prevent="fetchAnswer">
    <div class="row g-3">
        <div class="col-md-12">
          <label class="form-label" for="multicol-username">Enter your question here</label>
          <textarea class="form-control" name="question" id="question"  v-model="question"></textarea>
        </div>
    </div>
    <hr>
    <div class="pt-4">
       <button type="submit" :disabled="!question" class="btn btn-primary me-sm-3 me-1 waves-effect waves-light">
          {{ `${isLoading ? 'asking ai...' : 'Ask'}` }}
       </button>
       <button type="reset" class="btn btn-secondary waves-effect">Reset</button>
    </div>
    <br/>
</form>

   </div>

<div class="row">
  <div class="col-lg-12 mb-4 order-0">
    <div class="card">
      <div class="d-flex align-items-end row">
        <div class="col-sm-7">
          <div class="card-body">
            <h5 class="card-title text-primary">Chat answare by ai 🎉</h5>
            <p class="mb-4">
                <AIAnswer :answer="answer" />
            </p>

            <!-- <a href="javascript:;" class="btn btn-sm btn-outline-primary">View Badges</a> -->
          </div>
        </div>
        <div class="col-sm-5 text-center text-sm-left">
          <div class="card-body pb-0 px-0 px-md-4">
            <img :src="$backendurl+'/resources/template-backend/assets/img/illustrations/man-with-laptop-light.png'" height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png">
          </div>
        </div>
      </div>
    </div>
  </div>

</div>


</div>
</template>

<style scoped>

.mb-5 {
  margin-bottom: 5rem;
}
.mb-10 {
  margin-bottom: 10rem;
}

</style>
