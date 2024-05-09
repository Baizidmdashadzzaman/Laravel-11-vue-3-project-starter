import api from "../apis/api";
import store from '../../store/index';
import { ref } from 'vue';

export let authorized = ref(false);

export const login = async () => {
    processing.value = true;
    await api().post('/login',auth.value).then(({data})=>{
        store.dispatch('auth/login',data);
    }).catch(({response})=>{
       validationErrors.value = response.data.message;
    }).finally(()=>{
        processing.value = false
    })
};

export const logout = async () => {
    await api().post('/logout').then(({data})=>{
        store.dispatch('auth/logout');
    }).catch(({response})=>{
        if(response.status===400){
          validationErrors.value = response.data.message;
        }else{
          validationErrors.value = response.data.message;
        }
    }).finally(()=>{

    })
};


export const userinfo = store.getters["auth/user"];

export const checkauth = async () => {
    await api().get('/userinfo').then(({data})=>{
       console.log('you are authorized');
       authorized.value = true;
    }).catch(({response})=>{
       if(response.status == 404){
          store.dispatch('auth/logout');
          authorized.value = false;
       }
       if(response.status == 401){
         store.dispatch('auth/logout');
         authorized.value = false;
      }
    }).finally(()=>{
       console.log('this is end point');
    })
};

export const checkauth2 = async () => {
    await api().get('/userinfo').then(({data})=>{
       console.log('you are authorized');
    }).catch(({response})=>{
       if(response.status == 404){
          store.dispatch('auth/logout2');
       }
       if(response.status == 401){
          store.dispatch('auth/logout2');
       }
       if(response.status == 400){
          store.dispatch('auth/logout2');
       }
    }).finally(()=>{
       console.log('this is end point');
    })
};


