import api from "./api";
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { saveAs } from 'file-saver';

export default function useDataCall() {

    let alldata = ref([]);
    let loading = ref(true);
    let urlcall = ref("");
    let pageid = ref("");
    let loadingBtn = ref(false);
    let validationErrors = ref("");
    let singledata = ref({});
    let addingstatus = ref(false);
    const router = useRouter();

    function getResults(page) {
        loading.value = true;
        if (typeof page === 'undefined') {
            page = 1;
        }
       api().get('/'+urlcall.value+'/list?page=' + page)
       .then((response) => {
           loading.value = false;
           alldata.value = response.data.alldata;
       });
    }
    function getResultsByID(page) {
        loading.value = true;
        if (typeof page === 'undefined') {
            page = 1;
        }
       api().get('/'+urlcall.value+'/list-all-id-wise/'+pageid+'?page=' + page)
       .then((response) => {
           loading.value = false;
           alldata.value = response.data.alldata;
       });
    }

    const getResultAll = async (urlcustom) => {
       try {
         const response = await api().get(urlcustom);
         return response.data;
       } catch (error) {
         console.error('Error fetching data:', error);
         throw error;
       }
    }

    const getSingleData = async (id) => {
       loading.value = true;
       await api().get('/'+urlcall.value+'/edit/' + id)
       .then((response) => {
           loading.value = false;
           singledata.value = response.data.alldata;
       });
    }
    const getSingleDataCutomUrl = async (id,url) => {
        loading.value = true;
        await api().get('/'+url+'/edit/' + id)
        .then((response) => {
            loading.value = false;
            singledata.value = response.data.alldata;
        });
     }

    function searchResults(e) {
        loading.value = true;
        let formData = new FormData();
        formData.append('search', e.target.value);
        let uri = '/'+urlcall.value+'/search';
        api().post(uri, formData).then((response) => {
           loading.value = false;
           alldata.value = response.data.alldata;
        })
    }

    function dataDelete(id, index) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Deleted data cannot be retrive!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#696cff',
            cancelButtonColor: '#696cff',
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
                    confirmButtonColor: '#696cff',
                    confirmButtonText: 'Close',
                })
                getResults();
             })
             .catch((error) => {
               console.log(error.response.data);
             });
          }
        })
    }

    const storeData = async (formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        addingstatus.value = false;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        await api().post('/'+urlcall.value+'/store',formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            })
            addingstatus.value = true;
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

    const updateData = async (id,formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        await api().post('/'+urlcall.value+'/update/'+id,formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            })
            router.push({name: 'admin.'+urlcall.value+'.list'});
        }).catch(({response})=>{
            if(response.status===400){
                validationErrors.value = response.data.message;
            }
            if(response.status===404){
                validationErrors.value = response.data.message;
            }
        }).finally(()=>{
            loadingBtn.value = false;
        })
    };

    const updateDataWithoutPush = async (id,formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        await api().post('/'+urlcall.value+'/update/'+id,formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            })
        }).catch(({response})=>{
            if(response.status===400){
                validationErrors.value = response.data.message;
            }
            if(response.status===404){
                validationErrors.value = response.data.message;
            }
        }).finally(()=>{
            loadingBtn.value = false;
        })
    };

    function exportData(url,filename) {
        api().get(`${url}`, {
            responseType: 'blob'
        })
        .then(response => {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, filename+'.xlsx');
            Swal.fire({
                title: 'Success',
                text: 'File downloaded successfully',
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            });
        })
        .catch(error => {
            console.error('Error downloading file:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to download file',
                icon: 'error',
                confirmButtonColor: '#ff0000',
                confirmButtonText: 'Close',
            });
        });
    }

    const importData = async (url,formdata) => {
        validationErrors.value = '';
        loadingBtn.value = true;
        addingstatus.value = false;
        const config = { headers: { 'content-type': 'multipart/form-data' }}
        await api().post(url,formdata,config).then(({data})=>{
            Swal.fire({
                title: 'Success',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#696cff',
                confirmButtonText: 'Close',
            })
            addingstatus.value = true;
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

    return {
        importData,
        exportData,
        alldata,
        singledata,
        loading,
        loadingBtn,
        validationErrors,
        urlcall,
        pageid,
        addingstatus,
        getResults,
        getResultAll,
        getResultsByID,
        storeData,
        updateData,
        updateDataWithoutPush,
        searchResults,
        dataDelete,
        getSingleData,
        getSingleDataCutomUrl,
    }
}
