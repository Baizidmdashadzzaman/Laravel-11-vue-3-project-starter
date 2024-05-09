import api from "./api";
import apibase from "./apibase";
import store from '../../store/index'

import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default function useReuseableData() {

    let dashboarddata = ref([]);
    let loading = ref(true);
    let loadingreuse = ref(true);
    const router = useRouter();

   const getDashboardData = async () => {
      loadingreuse.value = true;
     await api().get('/reuseable/dashboard-data')
     .then((response) => {
        loadingreuse.value = false;
        dashboarddata.value = response.data;
     });
   }

   let allcountry = ref([]);
   const get_allcountry = async () => {
       loadingreuse.value = true;
      await api().get('/npreuseable/country-list')
      .then((response) => {
         loadingreuse.value = false;
         allcountry.value = response.data.alldata;
      });
   }
   let allcitynp = ref([]);
   const get_allcity_countrywise = async (id) => {
       loadingreuse.value = true;
      await api().get('/npreuseable/city-list-country-wise/'+id)
      .then((response) => {
         loadingreuse.value = false;
         allcitynp.value = response.data.alldata;
      });
   }

   let alllanguage = ref([]);
   const get_alllanguage = async () => {
       loadingreuse.value = true;
      await api().get('/npreuseable/language-list')
      .then((response) => {
         loadingreuse.value = false;
         alllanguage.value = response.data.alldata;
      });
   }
   let allmasjid = ref([]);
   const get_allmasjid = async () => {
       loadingreuse.value = true;
      await api().get('/npreuseable/masjid-list')
      .then((response) => {
         loadingreuse.value = false;
         allmasjid.value = response.data.alldata;
      });
   }

   const search_allmasjid = async (id) => {
      loadingreuse.value = true;
      await api().get('/reuseable/union-list-upazila-wise/'+id)
      .then((response) => {
         loadingreuse.value = false;
         allunion.value = response.data.alldata;
      });
   }

   let setting = ref({});
   const get_setting = async () => {
       loadingreuse.value = true;
      await api().get('/setting/setting')
      .then((response) => {
         loadingreuse.value = false;
         setting.value = response.data.alldata;
      });
   }

   let setting_public = ref({});
   const get_setting_public = async () => {
       loadingreuse.value = true;
      await apibase().get('/reuseable/setting')
      .then((response) => {
         loadingreuse.value = false;
         setting_public.value = response.data.alldata;
      });
   }

   let setting_admin = store.getters["setting/setting"];


   let allcategory = ref([]);
   const get_allcategory = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/category-list')
      .then((response) => {
         loadingreuse.value = false;
         allcategory.value = response.data.alldata;
      });
   }
   let allsubcategory = ref([]);
   const get_allsubcategory = async (id) => {
       loadingreuse.value = true;
      await api().get('/reuseable/subcategory-list-category-wise/'+id)
      .then((response) => {
         loadingreuse.value = false;
         allsubcategory.value = response.data.alldata;
      });
   }
   let allsubsubcategory = ref([]);
   const get_allsubsubcategory = async (id) => {
       loadingreuse.value = true;
      await api().get('/reuseable/subsubcategory-list-subcategory-wise/'+id)
      .then((response) => {
         loadingreuse.value = false;
         allsubsubcategory.value = response.data.alldata;
      });
   }

   let allbrand = ref([]);
   const get_allbrand = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/brand-list')
      .then((response) => {
         loadingreuse.value = false;
         allbrand.value = response.data.alldata;
      });
   }
   let allproducttype = ref([]);
   const get_allproducttype = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/producttype-list')
      .then((response) => {
         loadingreuse.value = false;
         allproducttype.value = response.data.alldata;
      });
   }
   let allorigincountry = ref([]);
   const get_allorigincountry = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/origincountry-list')
      .then((response) => {
         loadingreuse.value = false;
         allorigincountry.value = response.data.alldata;
      });
   }

   let allproduct = ref([]);
   const get_allproduct = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/product-list')
      .then((response) => {
         loadingreuse.value = false;
         allproduct.value = response.data.alldata;
      });
   }

   let allcolor = ref([]);
   const get_allcolor = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/color-list')
      .then((response) => {
         loadingreuse.value = false;
         allcolor.value = response.data.alldata;
      });
   }

   let allsize = ref([]);
   const get_allsize = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/size-list')
      .then((response) => {
         loadingreuse.value = false;
         allsize.value = response.data.alldata;
      });
   }

   let allbondsize = ref([]);
   const get_allbondsize = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/bondsize-list')
      .then((response) => {
         loadingreuse.value = false;
         allbondsize.value = response.data.alldata;
      });
   }

   let allcupsize = ref([]);
   const get_allcupsize = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/cupsize-list')
      .then((response) => {
         loadingreuse.value = false;
         allcupsize.value = response.data.alldata;
      });
   }

   let allcustomer = ref([]);
   const get_allcustomer = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/customer-list')
      .then((response) => {
         loadingreuse.value = false;
         allcustomer.value = response.data.alldata;
      });
   }

   let alldelivarycharge = ref([]);
   const get_alldelivarycharge = async () => {
       loadingreuse.value = true;
      await api().get('/reuseable/delivarycharge-list')
      .then((response) => {
         loadingreuse.value = false;
         alldelivarycharge.value = response.data.alldata;
      });
   }

    return {
        alldelivarycharge,get_alldelivarycharge,
        allcustomer,get_allcustomer,
        allproduct,get_allproduct,
        allcolor,get_allcolor,
        allsize,get_allsize,
        allbondsize,get_allbondsize,
        allcupsize,get_allcupsize,

        allbrand,get_allbrand,
        allproducttype,get_allproducttype,
        allorigincountry,get_allorigincountry,

        allcategory,get_allcategory,
        allsubcategory,get_allsubcategory,
        allsubsubcategory,get_allsubsubcategory,


        setting_admin,
        setting_public,
        get_setting_public,
        setting,
        get_setting,
        allmasjid,
        get_allmasjid,
        alllanguage,
        get_alllanguage,
        allcitynp,
        get_allcity_countrywise,
        allcountry,
        get_allcountry,
        loadingreuse,
        loading,
        dashboarddata,
        getDashboardData,
    }
}
