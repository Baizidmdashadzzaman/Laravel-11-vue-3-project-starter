<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";
import api from "@/components/apis/api";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const { state_product,state_order,state_orderproduct,state_productsearch,state_productstock } = usemodelData();

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus,loading } = useDataCall();

const {
    allcategory,get_allcategory,allsubcategory,get_allsubcategory,
    allsubsubcategory,get_allsubsubcategory,allbrand,get_allbrand,
    allproducttype,get_allproducttype,allorigincountry,get_allorigincountry,
    allcustomer,get_allcustomer,alldelivarycharge,get_alldelivarycharge,
    allcolor,get_allcolor,
    allsize,get_allsize,
    allbondsize,get_allbondsize,
    allcupsize,get_allcupsize,
} = useReuseableData();


const emit = defineEmits(['changeActive'])
let pagename = ref('Order');
let url_data = ref('order');

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allcategory();
  get_allbrand();
  get_allproducttype();
  get_allorigincountry();
  get_allcustomer();
  getProductInfo();
  get_alldelivarycharge();
  get_allcolor();
  get_allsize();
  get_allbondsize();
  get_allcupsize();
  getCartProduct();
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


const singledatapage_search = reactive({ ...state_productsearch });
const singledatapagestock = reactive({ ...state_productstock });

let alldata = ref([]);
function getProductInfo(page) {
    loading.value = true;
     if (typeof page === 'undefined') {
         page = 1;
     }
    let uri = '/'+urlcall.value+'/get-product-list?page=' + page;
    api().post(uri, singledatapage_search)
    .then((response) => {
        loading.value = false;
        alldata.value = response.data.alldata;
    });
}

let alldata_cart = ref([]);
let sum_sales_price = ref(0);
let sum_sales_quantity = ref(0);
let sum_discount_amount = ref(0);
let sum_total_amount = ref(0);
function getCartProduct() {
    loading.value = true;
    let formData = new FormData();
    formData.append('admin_id', '');
    let uri = '/'+urlcall.value+'/get-cart-product-list';
    api().post(uri,formData)
    .then((response) => {
        loading.value = false;
        alldata_cart.value = response.data.alldata;
        sum_sales_price.value = response.data.sum_sales_price;
        sum_sales_quantity.value = response.data.sum_sales_quantity;
        sum_discount_amount.value = response.data.sum_discount_amount;
        sum_total_amount.value = response.data.sum_total_amount;
    });
}

const singledatapage_order = reactive({ ...state_order });
const singledatapage_orderproduct = reactive({ ...state_orderproduct });

let modal_btn = ref('Save');
let modal_title = ref('Add product cart');
let modal_show = ref(false);

watch([singledatapage_orderproduct], () => {
  calculate_single_product_modal_data();
});
const calculate_single_product_modal_data = async () => {
    singledatapage_orderproduct.sub_total = singledatapage_orderproduct.sales_quantity * singledatapage_orderproduct.sales_price;
    if(singledatapage_orderproduct.discount_type == 'money')
    {
        singledatapage_orderproduct.discount_amount = singledatapage_orderproduct.discount_percent;
    }
    else
    {
        singledatapage_orderproduct.discount_amount = (singledatapage_orderproduct.sub_total * (singledatapage_orderproduct.discount_percent /100)).toFixed(2);
    }
    singledatapage_orderproduct.total_amount = singledatapage_orderproduct.sub_total - singledatapage_orderproduct.discount_amount;
}


const removeFromCart = async (id) => {
   stock_message.value = '';
   loading.value = true;
   let formData = new FormData();
   formData.append('id', id);
   let uri = '/order/remove-product-cart';
   api().post(uri, formData)
   .then((response) => {
      if(response.data.status == true){
         toast.success(response.data.message);
         getCartProduct();
       }else{
         toast.warning(response.data.message);
       }

   });

};

const addDataModal = async (id) => {
   stock_message.value = '';
   loading.value = true;
   let formData = new FormData();
   formData.append('product_id', id);
   let uri = '/order/get-single-product';
   api().post(uri, formData)
   .then((response) => {
       loading.value = false;
       singledatapage_orderproduct.id = '';
       singledatapage_orderproduct.product_id = response.data.alldata.id;
       singledatapage_orderproduct.name = response.data.alldata.name;
       singledatapage_orderproduct.slug = response.data.alldata.slug;
       singledatapage_orderproduct.image = response.data.alldata.image;
       singledatapage_orderproduct.code = response.data.alldata.code;
       singledatapage_orderproduct.original_price = response.data.alldata.original_price;
       singledatapage_orderproduct.price = response.data.alldata.price;
       singledatapage_orderproduct.sell_price = response.data.alldata.sell_price;
       singledatapage_orderproduct.sales_quantity = 1;
       singledatapage_orderproduct.sales_price = response.data.alldata.sell_price;

       singledatapagestock.product_id = response.data.alldata.id;

       modal_btn.value = 'Add';
       modal_title.value = 'Add product cart';
       modal_show.value = true;

   });

};

let stock_message = ref('');

const checkStockProduct = async () => {
    loadingBtn.value = true;
   let uri = '/order/get-product-stock';
   api().post(uri, singledatapage_orderproduct)
   .then((response) => {
    loadingBtn.value = false;

       if(response.data.alldata == null){
        stock_message.value = 'Unable to find any stock information';
       }else{
        stock_message.value = 'Product available in stock: '+response.data.alldata.stock;
       }
       singledatapagestock.stock = response.data.alldata.stock??0;

       modal_btn.value = 'Add';
       modal_title.value = 'Add product cart';
       modal_show.value = true;
   });

};

const addProductCart = async () => {
   loadingBtn.value = true;
   let uri = '/order/add-product-cart';
   api().post(uri, singledatapage_orderproduct)
   .then((response) => {
       loadingBtn.value = false;

       if(response.data.status == true){
        toast.success(response.data.message);
         modal_show.value = false;
         getCartProduct();
       }else{
         toast.warning(response.data.message);
       }

   });

};

const closeDataModal = async () => {
    modal_show.value = false;
};



</script>
<template>

<div v-if="modal_show == true" class="modal"  style="display: block;background-color: #0b0b0b6b;">
        <div class="modal-dialog modal-lg">
          <form @submit.prevent="addProductCart()" enctype="multipart/form-data" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="backDropModalTitle">{{ modal_title }}</h5>
              <button @click="closeDataModal" type="button" class="btn-close" ></button>
            </div>
            <hr/>
            <div class="modal-body">

              <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
                  <ul class="mb-0" style="font-family: 'Nunito';">
                     <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                  </ul>
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>

              <div class="row g-3">
                <div v-if="stock_message != ''" class="alert alert-success alert-dismissible" role="alert">
                    <b>{{ stock_message }}</b>
                </div>

               <div class="row">
                <div class="col-md-3">
                  <label for="nameBackdrop" class="form-label">Color</label>
                  <select v-model="singledatapage_orderproduct.color_id" class="form-select">
                     <option value='' >--please select--</option>
                     <option v-for="(value, key) in allcolor" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="nameBackdrop" class="form-label">Size</label>
                  <select v-model="singledatapage_orderproduct.size_id" class="form-select">
                     <option value='' >--please select--</option>
                     <option v-for="(value, key) in allsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="nameBackdrop" class="form-label">Cup size</label>
                  <select v-model="singledatapage_orderproduct.cupsize_id" class="form-select">
                     <option value='' >--please select--</option>
                     <option v-for="(value, key) in allcupsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="nameBackdrop" class="form-label">Bond size</label>
                  <select v-model="singledatapage_orderproduct.bondsize_id" class="form-select">
                     <option value='' >--please select--</option>
                     <option v-for="(value, key) in allbondsize" :value="value.id" :key="key">{{ value.name }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="nameBackdrop" class="form-label">Stock</label>
                  <input readonly type="text" v-model="singledatapagestock.stock" class="form-control" placeholder="enter here">
                </div>
                <div class="col-md-3">
                   <button @click="checkStockProduct" type="button" style="margin-top: 25px;" class="btn btn-success waves-effect waves-light w-100">
                      {{ loadingBtn ? "Please wait" : "Check stock" }}
                   </button>
                </div>
               </div>

                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Product name</label>
                  <input type="text" v-model="singledatapage_orderproduct.name" class="form-control" placeholder="enter here" readonly>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Code</label>
                  <input type="text" v-model="singledatapage_orderproduct.code" class="form-control" placeholder="enter here" readonly>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Original price</label>
                  <input type="text" v-model="singledatapage_orderproduct.original_price" class="form-control" placeholder="enter here" readonly>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Sell price</label>
                  <input type="text" v-model="singledatapage_orderproduct.sell_price" class="form-control" placeholder="enter here" readonly>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Sell qunatity</label>
                  <input type="text" v-model="singledatapage_orderproduct.sales_quantity" class="form-control" placeholder="enter here">
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Price</label>
                  <input type="text" v-model="singledatapage_orderproduct.sales_price" class="form-control" placeholder="enter here">
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Sub total</label>
                  <input type="text" v-model="singledatapage_orderproduct.sub_total" class="form-control" placeholder="enter here" readonly>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Discount percent</label>
                  <input type="text" v-model="singledatapage_orderproduct.discount_percent" class="form-control" placeholder="enter here">
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-email">Discount type</label>
                  <div class="input-group input-group-merge">
                    <select v-model="singledatapage_orderproduct.discount_type" class="form-select">
                         <option value="money">money</option>
                         <option value="percent">percent</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Discount amount</label>
                  <input type="text" v-model="singledatapage_orderproduct.discount_amount" class="form-control" placeholder="enter here">
                </div>
                <div class="col-md-3">
                  <label class="form-label" for="multicol-username">Total</label>
                  <input type="text" v-model="singledatapage_orderproduct.total_amount" class="form-control" placeholder="enter here" readonly>
                </div>

              </div>

            </div>
            <hr/>
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

      <div class="card-body" >
         <div class="alert alert-success alert-dismissible" role="alert" v-if="Object.keys(validationErrors).length > 0">
            <ul class="mb-0" style="font-family: 'Nunito';">
               <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
         </div>

         <div class="row g-3">

            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Category</label>
              <div class="input-group input-group-merge">
                <select @change="getSubCatMeth" v-model="singledatapage_search.category_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Subcategory</label>
              <div class="input-group input-group-merge">
                <select @change="getSubSubCatMeth" v-model="singledatapage_search.subcategory_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Subsubcategory</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_search.subsubcategory_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allsubsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Brand</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_search.brand_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allbrand" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Product type</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_search.producttype_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allproducttype" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Origin country</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_search.origincountry_id" class="form-select">
                     <option value='' disabled>--please select--</option>
                     <option v-for="(value, key) in allorigincountry" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Name</label>
              <input type="text" v-model="singledatapage_search.name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Code</label>
              <input type="text" v-model="singledatapage_search.code" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Code custom</label>
              <input type="text" v-model="singledatapage_search.code_custom" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Barcode</label>
              <input type="text" v-model="singledatapage_search.barcode" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
               <button @click="getProductInfo(alldata?.current_page??1)" style="margin-top: 25px;" type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light w-100">
                  {{ loadingBtn ? "Please wait" : "Search" }}
               </button>
            </div>

            <hr/>

            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="alert alert-success alert-dismissible" role="alert">
                     List of all product : <b>showing data ({{ alldata.data?.length??0 }})</b>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Purchase price</th>
                              <th>Sell price</th>
                              <th>Status</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                           <tr v-for="singledata in alldata.data" :key="singledata.id">
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.name }}</b></td>
                              <td><b>{{ singledata.original_price }}</b></td>
                              <td><b>{{ singledata.sell_price }}</b></td>
                              <td><span class="badge bg-label-success me-1" >{{ singledata.status }}</span></td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click="addDataModal(singledata.id)" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-edit me-md-2"></i>
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <br/>
                  <div class="row mx-2">
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite" >
                           Showing <font style="font-family: 'Nunito';">{{ alldata.data?.length }}</font> data
                        </div>
                     </div>
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                           <ul class="pagination pagination-sm">
                              <Bootstrap5Pagination
                                 :data="alldata"
                                 @pagination-change-page="getProductInfo"
                                 limit="2"
                                 />
                           </ul>
                        </div>
                     </div>
                  </div>
                  <LoadingDiv v-if="loading" />
            </div>

            <br/><br/>
            <hr/>
            <div  class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="alert alert-success alert-dismissible" role="alert">
                     List of product in cart: <b>showing data ({{ alldata_cart?.length??0 }})</b>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Discount</th>
                              <th>Total</th>
                              <th>Option</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                           <tr v-for="singledata in alldata_cart" :key="singledata.id">
                              <td>
                                 <strong >{{ singledata.id }}</strong>
                              </td>
                              <td><b>{{ singledata.name }}</b></td>
                              <td><b>{{ singledata.sales_price }}</b></td>
                              <td><b>{{ singledata.sales_quantity }}</b></td>
                              <td><b>{{ singledata.discount_amount }}</b></td>
                              <td><b>{{ singledata.total_amount }}</b></td>
                              <td>
                                <font v-if="singledata.color != null">Color: <b>{{ singledata.color?.name }}</b><br/></font>
                                <font v-if="singledata.size != null">Size: <b>{{ singledata.size?.name }}</b><br/></font>
                                <font v-if="singledata.bondsize != null">Bond size: <b>{{ singledata.bondsize?.name }}</b><br/></font>
                                <font v-if="singledata.cupsize != null">Cup size: <b>{{ singledata.cupsize?.name }}</b><br/></font>
                              </td>
                              <td>
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click="removeFromCart(singledata.id)" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-edit me-md-2"></i>
                                    </button>
                                    <button @click="removeFromCart(singledata.id)" class="btn btn-outline-success btn-sm waves-effect waves-light">
                                       <i class="ti ti-trash me-md-2"></i>
                                    </button>
                                 </div>
                              </td>
                           </tr>

                           <tr>
                              <td></td>
                              <td></td>
                              <td>৳ {{ sum_sales_price }}</td>
                              <td>৳ {{ sum_sales_quantity }}</td>
                              <td>৳ {{ sum_discount_amount }}</td>
                              <td>৳ {{ sum_total_amount }}</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>

                     </table>
                  </div>
            </div>

            <br/><br/>
            <hr/>
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="alert alert-success alert-dismissible" role="alert">
                     Order details information
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
            </div>


            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Customer</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_order.customer_id" class="form-select">
                     <option value=''>--please select--</option>
                     <option v-for="(value, key) in allcustomer" :value="value.id" :key="key">{{ value.name }}-{{ value.phone }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer name</label>
              <input type="text" v-model="singledatapage_order.customer_name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer phone</label>
              <input type="text" v-model="singledatapage_order.customer_phone" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer email</label>
              <input type="text" v-model="singledatapage_order.customer_email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer country</label>
              <input type="text" v-model="singledatapage_order.customer_country" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer division</label>
              <input type="text" v-model="singledatapage_order.customer_divison" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer city</label>
              <input type="text" v-model="singledatapage_order.customer_city" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer address</label>
              <input type="text" v-model="singledatapage_order.customer_address" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Customer zipcode</label>
              <input type="text" v-model="singledatapage_order.customer_zipcode" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Sales date</label>
              <input type="date" v-model="singledatapage_order.sales_date" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Admin approval</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_order.admin_approval" class="form-select">
                     <option value="yes">yes</option>
                     <option value="no">no</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Other information</label>
              <input type="text" v-model="singledatapage_order.other_information" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_order.status" class="form-select">
                     <option value="active">active</option>
                     <option value="inactive">inactive</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Sub total</label>
              <input type="text" v-model="singledatapage_order.sub_total" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Discount percent</label>
              <input type="text" v-model="singledatapage_order.discount_percent" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Discount type</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_order.discount_type" class="form-select">
                     <option value="money">money</option>
                     <option value="percent">percent</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Discount amount</label>
              <input type="text" v-model="singledatapage_order.discount_amount" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Vat percent</label>
              <input type="text" v-model="singledatapage_order.vat_percent" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Vat amount</label>
              <input type="text" v-model="singledatapage_order.vat_amount" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-email">Delivary charge</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage_order.delivarycharge_id" class="form-select">
                     <option value=''>--please select--</option>
                     <option v-for="(value, key) in alldelivarycharge" :value="value.id" :key="key">{{ value.name }}-price-{{ value.price }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Delivarycharge amount</label>
              <input type="text" v-model="singledatapage_order.delivarycharge_amount" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Total amount</label>
              <input type="text" v-model="singledatapage_order.total_amount" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Paid amount</label>
              <input type="text" v-model="singledatapage_order.paid_amount" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-3">
              <label class="form-label" for="multicol-username">Total amount</label>
              <input type="text" v-model="singledatapage_order.remaining_amount" class="form-control" placeholder="enter here">
            </div>


            <div class="col-md-3">
               <button @click="getProductInfo(alldata?.current_page??1)" style="margin-top: 25px;" type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light w-100">
                  {{ loadingBtn ? "Please wait" : "Submit order" }}
               </button>
            </div>

         </div>
         <div class="pt-4">

         </div>
      </div>

   </div>
   <br/><br/><br/>
</div>
</template>
