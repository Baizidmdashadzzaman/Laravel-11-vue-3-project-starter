<script setup>
import { onMounted, ref,watch } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';

const { alldata,loading,urlcall,getResults,searchResults,dataDelete,validationErrors,
        loadingBtn,getSingleData,singledata,updateData,getResultAll,addingstatus
} = useDataCall();


const emit = defineEmits(['changeActive'])
let pagename = ref('Bond size');
let url_data = ref('bondsize');
const route = useRoute();

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  getData();
});

let alldata_get = ref([]);
const getData = async () => {
    const datapro = await getResultAll('/reuseable/search/'+route.params.id)
    alldata_get.value = datapro.alldata;
    loading.value = false;
};

watch(() => route.params.id, (newId) => {
    getData();
})

</script>
<template>
<div style="margin-bottom: 100px;">
   <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light"><RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>Search : <b>{{ alldata_get?.length??0 }}</b></h4>
   <div class="row">
      <div class="col-lg-12">

         <div class="row mb-5">
                <div class="col-md-6" v-for="singledata in alldata_get" :key="singledata.id">
                  <RouterLink :to="{ name: 'admin.product.edit', params: { id: singledata.id } }" class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img class="card-img card-img-left" :src="$backendurl+'/resources/product/'+singledata.image" alt="Product image">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">{{ singledata.name }}</h5>
                          <p class="card-text">
                            Purchase price:{{ singledata.original_price }}<br/>
                            Sell price:{{ singledata.sell_price }}<br/>
                            Code:{{ singledata.code }}<br/>
                          </p>
                          <p class="card-text"><small class="text-muted"></small></p>
                        </div>
                      </div>
                    </div>
                  </RouterLink>
                </div>

         </div>
              <LoadingDiv v-if="loading" />
      </div>
   </div>
</div>
</template>
