<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import usemodelData from "@/components/apis/modelData";
import useReuseableData from "@/components/apis/reuseabledata";

const { state_product, } = usemodelData();

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();

const {
    allcategory,get_allcategory,allsubcategory,get_allsubcategory,
    allsubsubcategory,get_allsubsubcategory,allbrand,get_allbrand,
    allproducttype,get_allproducttype,allorigincountry,get_allorigincountry,
} = useReuseableData();


const emit = defineEmits(['changeActive'])
let pagename = ref('Product');
let url_data = ref('product');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allcategory();
  get_allbrand();
  get_allproducttype();
  get_allorigincountry();
});


const singledatapage = reactive({ ...state_product });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(state_product)) {
         singledatapage[key] = value
      }
      singledatapage.image = '';
      singledatapage.image_show = '';
      singledatapage.image_sec = '';
      singledatapage.image_sec_show = '';
   }
};

const getSubCatMeth = async () => {
   await get_allsubcategory(singledatapage.category_id);
   singledatapage.subcategory_id = '';
   singledatapage.subsubcategory_id = '';
};

const getSubSubCatMeth = async () => {
   await get_allsubsubcategory(singledatapage.subcategory_id);
   singledatapage.subsubcategory_id = '';
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

            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Category</label>
              <div class="input-group input-group-merge">
                <select @change="getSubCatMeth" v-model="singledatapage.category_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Subcategory</label>
              <div class="input-group input-group-merge">
                <select @change="getSubSubCatMeth" v-model="singledatapage.subcategory_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Subsubcategory</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.subsubcategory_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allsubsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Brand</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.brand_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allbrand" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Product type</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.producttype_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allproducttype" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Origin country</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.origincountry_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allorigincountry" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <hr/>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Name</label>
              <input type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Name(Bn)</label>
              <input type="text" v-model="singledatapage.name_bn" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Code</label>
              <input type="text" v-model="singledatapage.code" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Code custom</label>
              <input type="text" v-model="singledatapage.code_custom" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Barcode</label>
              <input type="text" v-model="singledatapage.barcode" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Short description</label>
              <textarea type="text" @change="singledatapage.shortdescription = $event.target.value" v-model="singledatapage.shortdescription" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Short description(Bn)</label>
              <textarea type="text" v-model="singledatapage.shortdescription_bn" class="form-control" placeholder="enter here"></textarea>
            </div>
            <div class="col-md-12">
              <label class="form-label" for="multicol-username">Description</label>
              <!-- <textarea type="text" v-model="singledatapage.description" class="form-control" placeholder="enter here"></textarea> -->
              <QuillEditor v-model:content="singledatapage.description" contentType="html" theme="snow" toolbar="full" style="height:200px;" />
            </div>
            <div class="col-md-12">
              <label class="form-label" for="multicol-username">Description(Bn)</label>
              <!-- <textarea type="text" v-model="singledatapage.description_bn" class="form-control" placeholder="enter here"></textarea> -->
              <QuillEditor v-model:content="singledatapage.description_bn" contentType="html" theme="snow" toolbar="full" style="height:200px;" />
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Image</label>
              <input type="file" @change="singledatapage.image = $event.target.files[0]" ref="file" class="form-control" placeholder="enter here">
              <!-- <img :src="$backendurl+'/resources/subsubcategory/'+singledatapage.image_show" style="width:150px;border-radius: 5px;"> -->
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Image 2</label>
              <input type="file" @change="singledatapage.image_sec = $event.target.files[0]" ref="file" class="form-control" placeholder="enter here">
              <!-- <img :src="$backendurl+'/resources/subsubcategory/'+singledatapage.banner_show" style="width:150px;border-radius: 5px;"> -->
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Purchase price</label>
              <input type="text" v-model="singledatapage.original_price" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Price</label>
              <input type="text" v-model="singledatapage.price" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Sell price</label>
              <input type="text" v-model="singledatapage.sell_price" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Variable product</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.variable_product" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Stock</label>
              <input type="text" v-model="singledatapage.stock" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Discount status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.discount_status" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Discount information</label>
              <input type="text" v-model="singledatapage.discount_information" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-username">Before discount price</label>
              <input type="text" v-model="singledatapage.before_discount_price" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Product featured</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.product_featured" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
            </div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="multicol-email">Has bond cup</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.has_bond_cup" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
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
