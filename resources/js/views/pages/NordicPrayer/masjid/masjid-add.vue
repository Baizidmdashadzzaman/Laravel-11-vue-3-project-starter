<script setup>
import { onMounted,ref,reactive } from 'vue';
import useDataCall from "@/components/apis/datacall";
import modelData from "@/components/apis/modeldata";
import useReuseableData from "@/components/apis/reuseabledata";
import usemodelData from "@/components/apis/modelData";

const { validationErrors,urlcall,loadingBtn,storeData,addingstatus } = useDataCall();
const { allcountry,get_allcountry,allcitynp,get_allcity_countrywise,alllanguage,get_alllanguage } = useReuseableData();
const { initialStateData_masjid, } = usemodelData();

const emit = defineEmits(['changeActive'])
let pagename = ref('Masjid');
let url_data = ref('masjid');
const backendurl = import.meta.env.VITE_BACKEND_URL;

onMounted(() => {
  emit('changeActive', url_data.value)
  urlcall.value = url_data.value;
  get_allcountry();
  get_alllanguage();
});


const singledatapage = reactive({ ...initialStateData_masjid });

const saveData = async () => {
   await storeData(singledatapage);
   if(addingstatus.value){
      for (const [key, value] of Object.entries(initialStateData_masjid)) {
         singledatapage[key] = value
      }
   }
};

const onImageChange = (e) => {
   singledatapage.logo = e.target.files[0];
};


const onChangeCountry = async (e) => {
   singledatapage.city_n_p_id = '';
   await get_allcity_countrywise(singledatapage.country_id);
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

            <h6 class="mb-b fw-semibold">1. Basic details</h6>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Country</label>
              <div class="input-group input-group-merge">
                <select @change="onChangeCountry()" v-model="singledatapage.country_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allcountry" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">City</label>
              <div class="input-group input-group-merge">
                <!-- <v-select style="width: 100%;" class="form-select" :options="['Canada', 'United States']"></v-select> -->
                <select v-model="singledatapage.city_n_p_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in allcitynp" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Primary language</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.primary_lang_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in alllanguage" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Secondary language</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.secondary_lang_id" class="form-select">
                     <option value='' disabled>--please select data--</option>
                     <option v-for="(value, key) in alllanguage" :value="value.id" :key="key">{{ value.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Latitude</label>
              <input type="text" v-model="singledatapage.latitude" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Longitude</label>
              <input type="text" v-model="singledatapage.longitude" class="form-control" placeholder="enter here">
            </div>
            <hr/>
            <h6 class="mb-b fw-semibold">2. Full details</h6>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Name</label>
              <input type="text" v-model="singledatapage.name" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Name (second lang)</label>
              <input type="text" v-model="singledatapage.name_lang" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Slug</label>
              <input type="text" v-model="singledatapage.slug" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Sub title</label>
              <input type="text" v-model="singledatapage.subtitle" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Sub title (second lang)</label>
              <input type="text" v-model="singledatapage.subtitle_lang" class="form-control" placeholder="enter here">
            </div>

            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Logo</label>
              <input type="file" @change="onImageChange" ref="file" class="form-control" placeholder="enter here">
              <!-- <img :src="$backendurl+'/resources/masjid/'+singledatapage.logo_show" style="width:150px;border-radius: 5px;"> -->
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Address</label>
              <input type="text" v-model="singledatapage.address" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Address (second lang)</label>
              <input type="text" v-model="singledatapage.address_lang" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Phone</label>
              <input type="text" v-model="singledatapage.phone" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Phone (second lang)</label>
              <input type="text" v-model="singledatapage.phone_lang" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Email</label>
              <input type="text" v-model="singledatapage.email" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Zip code</label>
              <input type="text" v-model="singledatapage.zip_code" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Admin note</label>
              <input type="text" v-model="singledatapage.admin_note" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Admin note (second lang)</label>
              <input type="text" v-model="singledatapage.admin_note_lang" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Status</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.status" class="form-select">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Display type</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.display_style" class="form-select">
                     <option value="1">Default</option>
                </select>
              </div>
            </div>
            <hr/>
            <h6 class="mb-b fw-semibold">3. Setting</h6>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Hijri date adjust</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.hijridateadjust" class="form-select">
                     <option value="dontaddoffset">Dont add offset</option>
                     <option value="add1daytohd">Add 1 day</option>
                     <option value="add2daytohd">Add 2 day</option>
                     <option value="minus1daytohd">Minus 1 day</option>
                     <option value="minus2daytohd">Minus 2 day</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Observe day light saving time</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_odlst" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Show jumah time</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_sjt" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Make Jumah time equal to friday zuhr time</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_mJtetfzt" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Show tomorrow times as iqamah time and not adhan time</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_sttaitanat" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Specify iqamah for each salah</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_sifes" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Show iqamah minutes as time</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_simat" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Display time in 12 hours format</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_dti12hf" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Display salah markers</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_dsm" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Show hijri date</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_shd" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Play turn off mobile sound before adhan and iqamah</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_ptomsbaai" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-email">Enable multiple salah timings</label>
              <div class="input-group input-group-merge">
                <select v-model="singledatapage.screentsetting_emst" class="form-select">
                     <option value="yes">Yes</option>
                     <option value="no">No</option>
                </select>
              </div>
            </div>
            <hr/>
            <h6 class="mb-b fw-semibold">4. Time adjust</h6>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Iqamah minutes to faj</label>
              <input type="number" v-model="singledatapage.iqamah_minutes_to_fajr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Iqamah minutes to dhuhr</label>
              <input type="number" v-model="singledatapage.iqamah_minutes_to_dhuhr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Iqamah minutes to asr</label>
              <input type="number" v-model="singledatapage.iqamah_minutes_to_asr" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Iqamah minutes to maghrib</label>
              <input type="number" v-model="singledatapage.iqamah_minutes_to_maghrib" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Iqamah minutes to isha</label>
              <input type="number" v-model="singledatapage.Iqamah_minutes_to_isha" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Jumah adhan time</label>
              <input type="text" v-model="singledatapage.jumah_adhan_time" class="form-control" placeholder="enter here">
            </div>
            <div class="col-md-4">
              <label class="form-label" for="multicol-username">Minutes to jumah iqamah</label>
              <input type="number" v-model="singledatapage.Minutes_to_jumah_iqamah" class="form-control" placeholder="enter here">
            </div>

         </div>
         <hr/>
         <div class="pt-4">
            <button type="submit" class="btn btn-success me-sm-3 me-1 waves-effect waves-light">
               {{ loadingBtn ? "Please wait" : "Submit" }}
            </button>
            <button type="reset" class="btn btn-label-secondary waves-effect">Reset</button>
         </div>
         <br/>
      </form>
   </div>
</div>
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>
