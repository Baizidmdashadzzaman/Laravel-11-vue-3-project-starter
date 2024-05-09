<script setup>
import { onMounted,ref,reactive } from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import useDataCall from "@/components/apis/datacall"
import useReuseableData from "@/components/apis/reuseabledata";
import Calculator from '@/components/lib/admin/dashboard/calculator.vue';
import { StreamBarcodeReader } from "vue-barcode-reader";


const { alldata,loading,urlcall,getResults,searchResults,dataDelete} = useDataCall();
const { allcategory,getAllCategory,allsubcategory,getSubcategoryCategorywise,allsubsubcategory,
getSubsubcategorySubcategorywise,allbrand,getBrand,allproducttype,getProducttype,
allsupplier,getSupplier,allcustomer,getCustomer, } = useReuseableData();

const emit = defineEmits(['changeActive'])

onMounted(() => {
  emit('changeActive', 'পণ্য বিক্রয় করুন')
  urlcall.value = 'branch';
  getResults();
  getAllCategory();
  getBrand();
  getProducttype();
  getSupplier();
  getCustomer();
});

const initialStateData = {
   category_id:'',
   subcategory_id:'',
   subsubcategory_id:'',
   brand_id:'',
   product_type_id:'',
   supplier_id:'',
   customer_id:'',
   show_price:'productcode',
};
const singledatapage = reactive({ ...initialStateData });

const changeCategory = async (e) => {
   await getSubcategoryCategorywise(singledatapage.category_id);
   singledatapage.subcategory_id ='';
   singledatapage.subsubcategory_id ='';
};
const changeSubcategory = async (e) => {
   await getSubsubcategorySubcategorywise(singledatapage.subcategory_id);
   singledatapage.subsubcategory_id ='';
};

let widgetshowing = ref('none');
const changeWidget = (e) => {
   widgetshowing.value = e;
};

const onDecode = (e) => {

};
const onLoaded = (e) => {

};

</script>
<template>
<div style="margin-bottom: 0px;padding: 15px;">

    <div class="row  b"><div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 "><div class="dataTables_length" id="DataTables_Table_0_length"></div><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3"><div class="dt-buttons btn-group flex-wrap">
    <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">বিক্রয় ব্যবস্থাপনা / </span>পণ্য বিক্রয় করুন</h4>
    </div></div></div><div class="col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 "><div id="DataTables_Table_0_filter" class="dataTables_filter">

        <button @click="changeWidget('none')" type="button"
        :class="widgetshowing=='none'?'btn btn-sm btn-success':'btn btn-sm btn-label-success'"
        style="margin-right: 2px;"><span><i class="ti ti-square-rounded-minus "></i><span class="d-md-inline-block d-none"></span></span></button>

        <button @click="changeWidget('calculator')" type="button"
        :class="widgetshowing=='calculator'?'btn btn-sm btn-success':'btn btn-sm btn-label-success'"
        style="margin-right: 2px;"><span><i class="ti ti-calculator "></i><span class="d-md-inline-block d-none"></span></span></button>

        <a href="/admin/branch/list" class="btn btn-sm btn-label-success" tabindex="0" aria-controls="DataTables_Table_0" type="button" style="margin-right: 2px;"><span><i class="ti ti-clipboard "></i><span class="d-md-inline-block d-none"></span></span></a>

        <button @click="changeWidget('barcodescanner')" type="button"
        :class="widgetshowing=='barcodescanner'?'btn btn-sm btn-success':'btn btn-sm btn-label-success'"
        style="margin-right: 2px;"><span><i class="ti ti-barcode "></i><span class="d-md-inline-block d-none"></span></span></button>

        <a href="/admin/branch/list" class="btn btn-sm btn-label-success" tabindex="0" aria-controls="DataTables_Table_0" type="button" style="margin-right: 2px;" ><span><i class="ti ti-speakerphone "></i><span class="d-md-inline-block d-none"></span></span></a>

        <a href="/admin/branch/list" class="btn btn-sm btn-label-success" tabindex="0" aria-controls="DataTables_Table_0" type="button" style="margin-right: 2px;" ><span><i class="ti ti-package "></i><span class="d-md-inline-block d-none"></span></span></a>

        <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-sm btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button" style="margin-right: 2px;" ><span><i class="ti ti-arrow-back-up-double "></i><span class="d-md-inline-block d-none"></span></span></RouterLink>

    </div><div class="invoice_status mb-3 mb-md-0"></div></div></div>

   <div class="row">
      <div class="col-lg-8" style="padding-right: 0px;">
         <div class="card h-100">
            <div class="table-responsive ">
               <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b">
                     <div class="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                        <div class="dataTables_length" id="DataTables_Table_0_length"></div>
                        <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                           <div class="dt-buttons btn-group flex-wrap">
                              <h5 class="card-header" style="padding-left:0px;">পণ্য তালিকা থেকে বিক্রয় করুন</h5>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-md-8 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-2 border-bottom">

                        <div class="row">
                             <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;">
                                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                      <select v-model="singledatapage.show_price" class="form-select">
                                           <option value='productcode'>মূল্য কোড দেখান</option>
                                           <option value='productprice'>বিক্রি মূল্য দেখান</option>
                                      </select>
                                  </div>
                             </div>
                             <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;">
                                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                    <input type="text" class="form-control" style="width: 100%;margin-left: 0em;" placeholder="পণ্যের নাম অনুসন্ধান">
                                  </div>
                             </div>
                             <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;">
                                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                    <input type="text" class="form-control" style="width: 100%;margin-left: 0em;" placeholder="পণ্য কোড অনুসন্ধান">
                                  </div>
                             </div>
                             <div class="col-md-3" style="padding-right: 1px;padding-left: 20px;">
                                  <div id="DataTables_Table_0_filter" class="dataTables_filter"><a href="/admin/branch/list" class="btn btn-label-success w-100" type="button" ><span><i class="ti ti-search "></i><span class="d-md-inline-block d-none"></span></span>
                                    অনুসন্ধান
                                  </a></div>
                             </div>
                        </div>


                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                  </div>
                  <div class="row ms-2 me-3 b">

                     <div class="row g-2 border-bottom" style="padding-bottom: 10px;">
                        <div class="col-md-2" >
                          <label class="form-label" for="multicol-email">ক্যাটাগরি</label>
                          <div class="input-group input-group-merge">
                            <select @change="changeCategory()" v-model="singledatapage.category_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allcategory" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-2" >
                          <label class="form-label" for="multicol-email">সাব ক্যাটাগরি</label>
                          <div class="input-group input-group-merge">
                            <select @change="changeSubcategory()" v-model="singledatapage.subcategory_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <label class="form-label" for="multicol-email">সাব-সাব ক্যাটাগরি</label>
                          <div class="input-group input-group-merge">
                            <select v-model="singledatapage.subsubcategory_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allsubsubcategory" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <label class="form-label" for="multicol-email">ব্র্যান্ড</label>
                          <div class="input-group input-group-merge">
                            <select v-model="singledatapage.brand_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allbrand" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <label class="form-label" for="multicol-email">পণ্যের ধরন</label>
                          <div class="input-group input-group-merge">
                            <select v-model="singledatapage.product_type_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allproducttype" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <label class="form-label" for="multicol-email">সরবরাহকারী</label>
                          <div class="input-group input-group-merge">
                            <select v-model="singledatapage.supplier_id" class="form-select">
                                 <option value='' >--অনুগ্রহপূর্বক সিলেক্ট করুন--</option>
                                 <option v-for="(value, key) in allsupplier" :value="value.id" :key="key">{{ value.name }}</option>
                            </select>
                          </div>
                        </div>
                     </div>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                  <perfect-scrollbar style="height: 300px;">
                     <!-- <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                        </thead>

                        <tbody class="table-border-bottom-0">
                            <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                           <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                           <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                           <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                           <tr>
                              <th>আইডি</th>
                              <th>নাম</th>
                              <th>স্ট্যাটাস</th>
                              <th>অ্যাকশন</th>
                           </tr>
                        </tbody>
                     </table> -->
                     <div class="row" style="margin:5px">
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:12px">
                                      দাম : ৳ <b v-if="singledatapage.show_price == 'productprice'">১০০</b><b v-if="singledatapage.show_price == 'productcode'">LNN</b>
                                    </button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div class="col-sm-6 col-lg-2" style="padding-right: 1px;padding-left: 1px;padding-bottom: 1px;">
                              <div class="card p-2 h-100 shadow-none border">
                                <div class="rounded-2 text-center mb-1">
                                  <a href="#"><img class="img-fluid" src="/assets/img/pages/app-academy-tutor-1.png" alt="tutor image 1" style="width: 100%;height: 80px;"></a>
                                  <p style="margin-bottom: 0px;font-size:10px" class="text-muted">প্রোডাক্ট নাম</p>
                                </div>
                                <div>
                                  <div class="d-flex flex-column flex-md-row gap-2 text-nowrap">
                                    <button type="button" class="btn btn-sm btn-label-success waves-effect waves-light w-100" style="font-size:10px">কার্টে যোগ করুন</button>
                                  </div>
                                </div>
                              </div>
                           </div>

                     </div>
                  </perfect-scrollbar>
                  </div>

                  <div class="row mx-2">
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite" >
                           দেখানো হচ্ছে <font style="font-family: 'Nunito';">{{ alldata.data?.length }}</font> ডেটা
                        </div>
                     </div>
                     <div class="col-sm-12 col-md-6">
                        <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                           <ul class="pagination pagination-sm">
                              <Bootstrap5Pagination
                                 :data="alldata"
                                 @pagination-change-page="getResults"
                                 limit="2"
                                 />
                           </ul>
                        </div>
                     </div>
                  </div>
                  <LoadingDiv v-if="loading" />
               </div>
            </div>
         </div>
      </div>
      <div class="col-lg-4" style="padding-left: 5px;">
        <div class="h-100">

          <div v-if="widgetshowing == 'calculator'" class="card " style="margin-bottom: 5px;">
            <div class="row ms-2 me-3 b">
               <div class="col-12 col-md-12 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                  <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                     <div class="dt-buttons btn-group flex-wrap">
                        <h5 class="card-header" style="padding-left:0px;">ক্যালকুলেটরে হিসাব করুন</h5>
                     </div>
                  </div>
               </div>
            </div>
            <Calculator style="padding:30px"/>
          </div>

          <div v-if="widgetshowing == 'barcodescanner'" class="card " style="margin-bottom: 5px;">
            <div class="row ms-2 me-3 b">
               <div class="col-12 col-md-12 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                  <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                     <div class="dt-buttons btn-group flex-wrap">
                        <h5 class="card-header" style="padding-left:0px;">
                          ক্যামেরায় আপনার পণ্যের বারকোড স্ক্যান করুন
                        </h5>
                     </div>
                  </div>
               </div>
            </div>
            <div style="padding:30px">
              <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"/>
            </div>
          </div>

        <div class="card ">
            <div class="table-responsive card-datatable">
               <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b">
                     <div class="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2 border-bottom">
                        <div class="dataTables_length" id="DataTables_Table_0_length"></div>
                        <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3">
                           <div class="dt-buttons btn-group flex-wrap">
                              <h5 class="card-header" style="padding-left:0px;">বিক্রয়কৃত পণ্য</h5>
                           </div>
                        </div>
                     </div>
                     <div class="col-12 col-md-6 d-flex flex-column flex-md-row pe-3 gap-md-2 border-bottom">

                        <div class="row">
                             <div class="col-md-6" >
                                 <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                    <!-- <a href="/admin/branch/list" class="btn btn-success" type="button"><span><i class="ti ti-search "></i><span class="d-md-inline-block d-none"></span></span></a> -->
                                    <select v-model="singledatapage.customer_id" class="form-select" style="min-width: 180px;">
                                         <option value='' >ক্রেতা সিলেক্ট করুন</option>
                                         <option v-for="(value, key) in allcustomer" :value="value.id" :key="key">{{ value.name }}-{{ value.phone }}</option>
                                    </select>

                                 </div>
                             </div>
                        </div>

                        <div class="invoice_status mb-3 mb-md-0"></div>
                     </div>
                  </div>
                  <div class="table-responsive text-nowrap border-bottom">
                     <perfect-scrollbar style="height: 200px;">
                     <table class="table table-hover ">
                        <thead>
                           <tr>
                              <th>পণ্য</th>

                              <th>পরিমাণ</th>
                              <th>মোট দাম</th>
                              <th>অ্যাকশন</th>
                           </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            <tr>
                              <th style="font-size: 10px;">
                                 <b>প্রোডাক্ট নাম</b>
                                 <br>
                                 ৳ ১০০
                              </th>

                              <th style="font-size: 10px;">
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                   <button type="button" style="padding: 0px;" class="btn btn-sm btn-label-success waves-effect waves-light">
                                       <i class="ti ti-square-rounded-minus"></i>
                                   </button>
                                   <button type="button" style="padding: 0px;" class="btn btn-sm btn-label-success waves-effect waves-light">
                                       <input type="text" style="width: 35px;" value="1">
                                   </button>
                                   <button type="button" style="padding: 0px;" class="btn btn-sm btn-label-success waves-effect waves-light">
                                       <i class="ti ti-square-rounded-plus"></i>
                                   </button>
                                 </div>
                              </th>
                              <th style="font-size: 10px;">৳ ১০০</th>
                              <th style="font-size: 10px;">
                                 <div class="btn-group" role="group" aria-label="Basic example">
                                   <button type="button" style="padding: 2px;" class="btn btn-sm btn-label-success waves-effect waves-light">
                                       <i class="ti ti-edit"></i>
                                   </button>
                                   <button type="button" style="padding: 2px;" class="btn btn-sm btn-label-success waves-effect waves-light">
                                       <i class="ti ti-trash-x"></i>
                                   </button>
                                 </div>
                              </th>
                           </tr>
                        </tbody>
                     </table>
                     </perfect-scrollbar>
                  </div>

               </div>
            </div>
         </div>

         <div class="card " style="margin-top: 5px;">
            <div class="">
               <div class="dataTables_wrapper dt-bootstrap5 no-footer">
                  <div class="row ms-2 me-3 b" style="padding-bottom: 2px;">
                     <div class="card-header " style="padding-bottom: 2px;padding-right: 1px;padding-left: 1px;">

                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">উপ মোট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ডিসকাউন্ট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ভ্যাট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ভ্যাট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>

                     </div>
                  </div>
                  <div class="row ms-2 me-3 b" style="padding-bottom: 2px;">
                     <div class="card-header " style="padding-bottom: 2px;padding-right: 1px;padding-left: 1px;">

                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">উপ মোট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ডিসকাউন্ট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ভ্যাট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>
                        <div class="col-md-3" style="padding-right: 1px;padding-left: 1px;"><label class="form-label" for="multicol-username">ভ্যাট</label><input value="0" type="number" class="form-control" placeholder="এখানে তথ্য লিখুন"></div>

                     </div>
                  </div>
                  <div class="row ms-2 me-3 b" style="padding-bottom: 10px;">
                     <RouterLink  :to="{name:'admin.branch.add'}" class="btn btn-sm btn-success" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><i class="ti ti-square-rounded-plus me-md-2"></i><span class="d-md-inline-block d-none">তথ্য যোগ করুন</span></span>
                           </RouterLink>
                  </div>

               </div>
            </div>
         </div>
        </div>
      </div>

      <!-- <center>
      <div class="float3 d-none d-sm-inline-block card ">
        <div class="row card-header" style="padding: 2px;">
          <div class="col-5">

          </div>
          <div class="col-7" style="padding: 0px;">

          </div>
        </div>
      </div>
      </center> -->

   </div>
</div>
</template>

<style scoped>
.float3 {
  position: fixed;
  width: 98.4%;
  height: 50px;
  bottom: 45px;
  right: 9px;
  /* background-color: #023364; */
  color: #FFF;
  border-radius: 5px;
  text-align: center;
  font-size: 30px;
  /* box-shadow: 2px 2px 3px #999; */
  z-index: 1000;
}
</style>
