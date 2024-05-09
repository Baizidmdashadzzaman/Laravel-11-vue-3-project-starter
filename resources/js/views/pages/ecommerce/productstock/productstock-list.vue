<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import usemodelData from "@/components/apis/modelData";
import useReuseableData from "@/components/apis/reuseabledata";
import api from "@/components/apis/api";

const {
    allproduct,get_allproduct,
    allcolor,get_allcolor,
    allsize,get_allsize,
    allbondsize,get_allbondsize,
    allcupsize,get_allcupsize,
} = useReuseableData();

const { state_product,state_productstock } = usemodelData();

const { validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,
        loading,getResultAll,dataDelete,addingstatus
 } = useDataCall();

const emit = defineEmits(['changeActive'])
const route = useRoute();
let pagename = ref('Product stock');
let url_data = ref('productstock');


const singledatapage = reactive({ ...state_product });
const singledatapagestock = reactive({ ...state_productstock });

let alldata_product = ref({});
const getProductInfo = async () => {
    const datapro = await getResultAll('/product/edit/'+route.params.id)
    alldata_product.value = datapro.alldata;
    loading.value = false;
};

onMounted(() => {
  emit('changeActive', 'product')
  urlcall.value = url_data.value;
//   getSingleData(route.params.id);
  getProductInfo();
  get_allcolor();
  get_allsize();
  get_allbondsize();
  get_allcupsize();
  singledatapagestock.product_id = route.params.id;
});



const deleteDataCustom = async (id, index) => {
    Swal.fire({
            title: 'Are you sure?',
            text: "Deleted data cannot be retrive!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28c76f',
            cancelButtonColor: '#28c76f',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
              api().get('/'+urlcall.value+`/delete/${id}`)
             .then((response) => {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonColor: '#28c76f',
                    confirmButtonText: 'Close',
                })
                getDataStock();
             })
             .catch((error) => {
               console.log(error.response.data);
             });
          }
    })
};

let alldata_stock = ref([]);
const getDataStock = async () => {
    const data = await getResultAll('/productstock/list-all-product-wise/'+route.params.id)
    alldata_stock.value = data.alldata;
};

onMounted(() => {
    getDataStock()
    console.log(alldata_stock);
});

let modal_btn = ref('Save');
let modal_title = ref('Add product stock');
let modal_show = ref(false);

const addDataModal = async () => {
    modal_btn.value = 'Save';
    modal_title.value = 'Add product stock';
    modal_show.value = true;
    singledatapagestock.id = '';
    singledatapagestock.product_id = route.params.id;
    singledatapagestock.color_id = '';
    singledatapagestock.size_id = '';
    singledatapagestock.bondsize_id = '';
    singledatapagestock.cupsize_id = '';
    singledatapagestock.stock = 0;
    singledatapagestock.status = 'active';
};
const closeDataModal = async () => {
    modal_show.value = false;
};


const storeData = async (formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        addingstatus.value = false;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        let urlForm = '';
        if(formdata.id === ''){ urlForm = '/productstock/store'; }
        else{ urlForm = '/productstock/update/'+formdata.id; }

        await api().post(urlForm,formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#28c76f',
                confirmButtonText: 'Close',
            })
            addingstatus.value = true;
            getDataStock();
            closeDataModal();
        }).catch(({response})=>{
            if(response.status===400){
                validationErrors.value = response.data.message;
            }
            if(response.status===404){
                validationErrors.value = response.data.message;
            }
            addingstatus.value = false;
        }).finally(()=>{
            loadingBtn.value = false;
        })
};


const editDataCustom = async (id) => {
   loading.value = true;
   await api().get('/'+urlcall.value+'/edit/' + id)
   .then((response) => {
       loading.value = false;
       //singledatapagestock.product_id = route.params.id;
       singledatapagestock.id = id;
       singledatapagestock.product_id = response.data.alldata.product_id;
       singledatapagestock.color_id = response.data.alldata.color_id;
       singledatapagestock.size_id = response.data.alldata.size_id;
       singledatapagestock.bondsize_id = response.data.alldata.bondsize_id;
       singledatapagestock.cupsize_id = response.data.alldata.cupsize_id;
       singledatapagestock.stock = response.data.alldata.stock;
       singledatapagestock.status = response.data.alldata.status;
       modal_btn.value = 'Update';
       modal_title.value = 'Update product stock';
       modal_show.value = true;
   });
}

</script>
<template>
<div class="">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">
        <RouterLink :to="{name:'admin.dashboard'}">Dashboard</RouterLink> / </span>{{ pagename }} / List / <span class="btn btn-outline-success btn-sm waves-effect waves-light">{{ alldata_product.name }}</span></h4>
   <div class="card mb-4">
      <div class="row ms-2 me-3 b">
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
            <div class="dataTables_length" id="DataTables_Table_0_length"></div>
            <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
               <div class="dt-buttons btn-group flex-wrap">
                  <h5 class="card-header" style="padding-left: 0px;">Product stock information</h5>
               </div>
            </div>
         </div>
         <div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">
            <div id="DataTables_Table_0_filter" class="dataTables_filter">
               <RouterLink  :to="{name:'admin.'+url_data+'.list'}" class="btn btn-secondary btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-arrow-back-up-double me-md-2"></i><span class="d-md-inline-block d-none">Back to previous</span></span>
               </RouterLink>
               &nbsp;&nbsp;
               <button @click="addDataModal" class="btn btn-secondary btn-success"  type="button"><span><i class="ti ti-square-rounded-plus me-md-2"></i><span class="d-md-inline-block d-none">Add stock</span></span>
               </button>
            </div>
            <div class="invoice_status mb-3 mb-md-0"></div>
         </div>
         <br><br><br>
      </div>

      <div v-if="modal_show == true" class="modal"  style="display: block;background-color: #0b0b0b6b;">
        <div class="modal-dialog">
          <form @submit.prevent="storeData(singledatapagestock)" enctype="multipart/form-data" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="backDropModalTitle">{{ modal_title }}</h5>
              <button @click="closeDataModal" type="button" class="btn-close" ></button>
            </div>
            <div class="modal-body">
              <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
                  <ul class="mb-0" style="font-family: 'Nunito';">
                     <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                  </ul>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              <div class="">
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Color</label>
                  <select v-model="singledatapagestock.color_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allcolor" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Size</label>
                  <select v-model="singledatapagestock.size_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Cup size</label>
                  <select v-model="singledatapagestock.cupsize_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allcupsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Bond size</label>
                  <select v-model="singledatapagestock.bondsize_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allbondsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Stock</label>
                  <input type="text" v-model="singledatapagestock.stock" class="form-control" placeholder="enter here">
                </div>
                <div class="col mb-3">
                  <label for="nameBackdrop" class="form-label">Status</label>
                  <select v-model="singledatapagestock.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="closeDataModal" type="button" class="btn btn-label-secondary waves-effect" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-success waves-effect waves-light">
                 {{ loadingBtn ? "Please wait" : modal_btn }}
              </button>
            </div>
          </form>
        </div>
      </div>


      <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th>Bond size</th>
                              <th>Cup size</th>
                              <th>Stock</th>
                              <th>Status</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                           <tr v-for="singledata in alldata_stock" :key="singledata.id">
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.color?.name }}</b></td>
                              <td><b>{{ singledata.size?.name }}</b></td>
                              <td><b>{{ singledata.bondsize?.name }}</b></td>
                              <td><b>{{ singledata.cupsize?.name }}</b></td>
                              <td><b>{{ singledata.stock }}</b></td>
                              <td><span class="badge bg-label-success me-1" >{{ singledata.status }}</span></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click.prevent="editDataCustom(singledata.id, index)" type="button" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                        <i class="ti ti-edit me-md-2"></i>
                                    </button>
                                    <button @click.prevent="deleteDataCustom(singledata.id, index)" type="button" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-square-rounded-x me-md-2"></i>
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

      <LoadingDiv v-if="loading" />
   </div>
   <br/><br/><br/><br/><br/><br/><br/>
</div>
</template>
