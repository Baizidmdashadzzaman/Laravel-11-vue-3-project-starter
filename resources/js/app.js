// import './bootstrap';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import vSelect from 'vue-select'
import { createApp } from 'vue';

import Router from '@/router'
import store from '@/store'
import App from '@/App.vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const path = window.location.pathname;

const isAdminPath = path.startsWith('/admin');
const isAdminPath2 = /\/admin\//.test(path);

console.log(isAdminPath2);

import url from '@/components/apis/url'
const { backendurl,frontendurl } = url();

let app;
app = createApp(App)
app.use(Router)
app.use(store)
// if (isAdminPath2 == true) {
//     app = createApp(App)
//     app.use(Router)
//     app.use(store)
// }
// else{
//     app = createApp(App2)
//     app.use(Router2)
//     app.use(store2)
// }

app.config.globalProperties.$backendurl = backendurl;
app.config.globalProperties.$frontendurl = frontendurl;
app.use(PerfectScrollbarPlugin)
app.use(VueSweetalert2)
window.Swal =  app.config.globalProperties.$swal;
app.component('QuillEditor', QuillEditor);
app.component('v-select', vSelect)

if (window.location.hostname === 'softscandic.com') {
    app.mount('#app');
} else if(window.location.hostname === 'www.softscandic.com'){
    app.mount('#app');
}
else if(window.location.hostname === '127.0.0.1'){
    app.mount('#app');
}
else {
    console.log('App not mounted. Domain is not softscandic.com');
}





