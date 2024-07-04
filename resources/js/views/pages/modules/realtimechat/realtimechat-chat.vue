
<script setup>
import { onMounted,ref,reactive,watch } from 'vue';
import useDataCall from "@/components/apis/datacall"
import { useRouter, useRoute } from 'vue-router';
import LoadingDiv from '@/components/lib/admin/layout/LoadingDiv.vue';
import usemodelData from "@/components/apis/modelData";
import api from "@/components/apis/api";
import {
  logout,userinfo,checkauth,authorized
} from '@/components/apis/auth';

const { validationErrors,urlcall,loadingBtn,getSingleData,singledata,updateData,loading,getResultAll,storeDataCustom } = useDataCall();
const { initialStateData_aztoken, } = usemodelData();

const emit = defineEmits(['changeActive'])
const route = useRoute();
let pagename = ref('Token');
let url_data = ref('aztoken');
const backendurl = import.meta.env.VITE_BACKEND_URL;

onMounted(() => {
  emit('changeActive', 'realtimechat')
  urlcall.value = url_data.value;
  loading.value = true;
  get_alldata();
  getDataCust();

  Echo.private(`chat.${userinfo.id}`)
    .listen("MessageSent", (response) => {
        alldata_data.value.push(response.message);
    })

});

let receiver = ref({});
const get_alldata = async () => {
    const data = await getResultAll('/admin/edit/'+route.params.id)
    receiver.value = data.alldata;
    loading.value = false;
};

let alldata_data = ref([]);
const getDataCust = async () => {
    const data = await getResultAll('/realtimechat/index/'+route.params.id)
    alldata_data.value = data.alldata;
    loading.value = false;
};


let formdata = reactive ({
    sender_id:userinfo.id,
    receiver_id:route.params.id,
    message:'',
});

const sendMessage = async () => {
    await storeDataCustom(formdata,'/realtimechat/store')
    await getDataCust()
    formdata.message = '';
};


</script>
<template>
<div class="">

   <div class="card mb-4">

   <div class="app-chat overflow-hidden card">
   <div class="row g-0">

      <!-- Chat History -->
      <div class="col app-chat-history">
         <div class="chat-history-wrapper">
            <div class="chat-history-header border-bottom">
               <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex overflow-hidden align-items-center">
                     <i class="bx bx-menu bx-sm cursor-pointer d-lg-none d-block me-2" data-bs-toggle="sidebar" data-overlay="" data-target="#app-chat-contacts"></i>
                     <div class="flex-shrink-0 avatar">
                        <div class="avatar me-2 avatar-online" >
                           <span class="avatar-initial rounded-circle bg-label-primary">
                            {{ receiver.name?.substring(0, 2) }}
                           </span>
                        </div>
                     </div>
                     <div class="chat-contact-info flex-grow-1 ms-3">
                        <h6 class="m-0">{{ receiver.name }}</h6>
                        <small class="user-status text-muted">{{ receiver.email }}</small>
                     </div>
                  </div>
                  <div class="d-flex align-items-center">
                     <i class="bx bx-phone-call cursor-pointer d-sm-block d-none me-3 fs-4"></i>
                     <i class="bx bx-video cursor-pointer d-sm-block d-none me-3 fs-4"></i>
                     <i class="bx bx-search cursor-pointer d-sm-block d-none me-3 fs-4"></i>
                     <div class="dropdown">
                        <button class="btn p-0" type="button" id="chat-header-actions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bx bx-dots-vertical-rounded fs-4"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                           <a class="dropdown-item" href="javascript:void(0);">View Contact</a>
                           <a class="dropdown-item" href="javascript:void(0);">Mute Notifications</a>
                           <a class="dropdown-item" href="javascript:void(0);">Block Contact</a>
                           <a class="dropdown-item" href="javascript:void(0);">Clear Chat</a>
                           <a class="dropdown-item" href="javascript:void(0);">Report</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div class="chat-history-body ps ps--active-y">
              <perfect-scrollbar  style="height: 200px;">
               <ul v-for="singledata in alldata_data" :key="singledata.id" class="list-unstyled chat-history mb-0">
                  <li v-if="singledata.sender_id == userinfo.id" class="chat-message chat-message-right">
                     <div class="d-flex overflow-hidden">
                        <div class="chat-message-wrapper flex-grow-1">
                           <div class="chat-message-text" style="background-color: #696cff;">
                              <p class="mb-0" v-html="singledata.message"></p>
                           </div>
                           <div class="text-end text-muted mt-1">
                              <i class="bx bx-check-double text-success"></i>
                              <small>{{ singledata.message_time }}</small>
                           </div>
                        </div>
                        <div class="user-avatar flex-shrink-0 ms-3">
                           <div class="avatar avatar-md">
                             <div class="avatar me-2 avatar-online" >
                               <span class="avatar-initial rounded-circle bg-label-primary">
                                  {{ singledata.sender?.name?.substring(0, 2) }}
                               </span>
                             </div>
                           </div>
                        </div>
                     </div>
                  </li>
                  <li v-else class="chat-message">
                     <div class="d-flex overflow-hidden">
                        <div class="user-avatar flex-shrink-0 me-3">
                           <div class="avatar avatar-md">
                             <div class="avatar me-2 avatar-online" >
                               <span class="avatar-initial rounded-circle bg-label-primary">{{ singledata.sender?.name?.substring(0, 2) }}</span>
                             </div>
                           </div>
                        </div>
                        <div class="chat-message-wrapper flex-grow-1">
                           <div class="chat-message-text">
                              <p class="mb-0" v-html="singledata.message"></p>
                           </div>
                           <div class="text-muted mt-1">
                              <small>{{ singledata.message_time }}</small>
                           </div>
                        </div>
                     </div>
                  </li>
               </ul>
              </perfect-scrollbar>
            </div>

            <!-- Chat message form -->
            <div class="chat-history-footer">
               <form @submit.prevent="sendMessage()" class="form-send-message d-flex justify-content-between align-items-center ">
                  <input v-model="formdata.message" class="form-control message-input border-0 me-3 shadow-none" placeholder="Type your message here...">
                  <div class="message-actions d-flex align-items-center">
                     <i class="speech-to-text bx bx-microphone bx-sm cursor-pointer"></i>
                     <label for="attach-doc" class="form-label mb-0">
                     <i class="bx bx-paperclip bx-sm cursor-pointer mx-3 text-body"></i>
                     <input type="file" id="attach-doc" hidden="">
                     </label>
                     <button type="submit" class="btn btn-primary d-flex send-msg-btn">
                        <i class="bx bx-paper-plane me-md-1 me-0"></i>
                        <span class="align-middle d-md-inline-block d-none">
                           {{ loadingBtn ? "Sending..." : "Send" }}
                        </span>
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
      <!-- /Chat History -->

      <div class="app-overlay"></div>
   </div>
</div>




      <LoadingDiv v-if="loading" />
   </div>

</div>
</template>
<style scoped>
.app-chat{position:relative;height:calc(100vh - 11rem)}.layout-navbar-hidden .app-chat{height:calc(100vh - 7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat{height:calc(100vh - 11rem - 2rem)}}@media(max-width: 992px){.app-chat .app-sidebar{z-index:4}}.app-chat .app-sidebar .sidebar-header{position:relative}.app-chat .app-sidebar .sidebar-header .close-sidebar{position:absolute;top:.5rem;right:.95rem}.app-chat .app-chat-contacts{position:absolute;left:calc(-21rem - 1rem);height:calc(100vh - 11rem);width:21rem;flex-basis:21rem;transition:all .25s ease}.layout-navbar-hidden .app-chat .app-chat-contacts{height:calc(100vh - 7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-contacts{height:calc(100vh - 11rem - 2rem)}}@media(min-width: 992px){.app-chat .app-chat-contacts{position:static}}.app-chat .app-chat-contacts.show{left:0rem}.app-chat .app-chat-contacts .sidebar-body{height:calc(calc(100vh - 11rem) - 4.49rem)}.layout-navbar-hidden .app-chat .app-chat-contacts .sidebar-body{height:calc(calc(100vh - 7rem) - 5rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-contacts .sidebar-body{height:calc(calc(100vh - 11rem) - 4.49rem - 2rem)}}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list .chat-contact-list-item-title{padding-bottom:0 !important}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item{display:flex;justify-content:space-between;padding:.518rem .75rem;margin:.5rem .75rem;border-left:2px solid rgba(0,0,0,0);cursor:pointer;border-radius:.375rem}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item a{width:100%}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item .avatar{border:2px solid rgba(0,0,0,0);border-radius:50%}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item .chat-contact-info{min-width:0}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item .chat-contact-info .chat-contact-name{line-height:1.5}.app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.chat-contact-list-item small{white-space:nowrap}.app-chat .app-chat-sidebar-left{position:absolute;top:0;left:calc(-21rem - 1rem);width:21rem;height:calc(100vh - 11rem);opacity:0;z-index:5;transition:all .25s ease}.layout-navbar-hidden .app-chat .app-chat-sidebar-left{height:calc(100vh - 7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-sidebar-left{height:calc(100vh - 11rem - 2rem)}}.app-chat .app-chat-sidebar-left.show{left:0;opacity:1}.app-chat .app-chat-sidebar-left .sidebar-body{height:calc(calc(100vh - 11rem) - 11.7rem)}.layout-navbar-hidden .app-chat .app-chat-sidebar-left .sidebar-body{height:calc(calc(100vh - 7rem) - 11rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-sidebar-left .sidebar-body{height:calc(calc(100vh - 11rem) - 11.7rem - 2rem)}}.app-chat .app-chat-history{position:relative;height:calc(100vh - 11rem);transition:all .25s ease}.layout-navbar-hidden .app-chat .app-chat-history{height:calc(100vh - 7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-history{height:calc(100vh - 11rem - 2rem)}}.app-chat .app-chat-history .chat-history-header{padding:1rem 1rem}.app-chat .app-chat-history .chat-history-header .user-status{margin-bottom:.1rem}.app-chat .app-chat-history .chat-history-body{height:calc(100vh - 20.8rem);padding:1.25rem 1.25rem;overflow:hidden}.layout-navbar-hidden .app-chat .app-chat-history .chat-history-body{height:calc(100vh - 16.7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-history .chat-history-body{height:calc(100vh - 20.8rem - 2rem)}}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message{display:flex;justify-content:flex-start}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message .chat-message-text{border-radius:.375rem;padding:.75rem 1rem}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message:not(.chat-message-right) .chat-message-text{border-top-left-radius:0}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right{justify-content:flex-end}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right .chat-message-text{border-top-right-radius:0}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right .user-avatar{margin-right:0rem;margin-left:1rem}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message .thumbnail{cursor:zoom-in}.app-chat .app-chat-history .chat-history-body .chat-history .chat-message:not(:last-child){margin-bottom:1rem}.app-chat .app-chat-history .chat-history-footer{padding:.5rem .5rem;margin:0 1.5rem;border-radius:.375rem}.app-chat .app-chat-sidebar-right{position:absolute;top:0;right:calc(-21rem - 1rem);width:21rem;height:calc(100vh - 11rem);opacity:0;z-index:5;transition:all .25s ease}.layout-navbar-hidden .app-chat .app-chat-sidebar-right{height:calc(100vh - 7rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-sidebar-right{height:calc(100vh - 11rem - 2rem)}}.app-chat .app-chat-sidebar-right.show{opacity:1;right:0}.app-chat .app-chat-sidebar-right .sidebar-body{height:calc(calc(100vh - 11rem) - 11.5rem)}.layout-navbar-hidden .app-chat .app-chat-sidebar-right .sidebar-body{height:calc(calc(100vh - 7rem) - 11.19rem)}@media(min-width: 1200px){.layout-horizontal .app-chat .app-chat-sidebar-right .sidebar-body{height:calc(calc(100vh - 11rem) - 11.5rem - 2rem)}}@media(max-width: 576px){.app-chat .app-chat-sidebar-right.show,.app-chat .app-chat-sidebar-left.show,.app-chat .app-chat-contacts.show{width:100%}}.light-style .app-chat .app-chat-contacts,.light-style .app-chat .app-chat-sidebar-left{background-color:#fff;box-shadow:0 0 0 1px rgba(67,89,113,.075)}.light-style .app-chat .app-chat-contacts .chat-actions .chat-search-input,.light-style .app-chat .app-chat-sidebar-left .chat-actions .chat-search-input{background-color:#f5f5f9}.light-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active,.light-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active{color:#fff}.light-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active h6,.light-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active .text-muted,.light-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active h6,.light-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active .text-muted{color:#fff !important}.light-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active .avatar,.light-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active .avatar{border-color:#fff}.light-style .app-chat .app-chat-history{background-color:#f5f5f9}.light-style .app-chat .app-chat-history .chat-history-wrapper .chat-history-header{background-color:#fff}.light-style .app-chat .app-chat-history .chat-history-footer{background-color:#fff;box-shadow:0 .125rem .25rem rgba(161,172,184,.4)}.light-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message .chat-message-text{background-color:#fff;box-shadow:0 .125rem .25rem rgba(161,172,184,.4)}.light-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right{justify-content:flex-end}.light-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right .chat-message-text{color:#fff}.light-style .app-chat .app-chat-sidebar-right{background-color:#fff;box-shadow:16px 1px 45px 3px rgba(67,89,113,.5)}@media(max-width: 992px){.light-style .app-chat .app-chat-contacts .chat-actions .chat-search-input{background-color:#fff}}.dark-style .app-chat .app-chat-contacts,.dark-style .app-chat .app-chat-sidebar-left{background-color:#2b2c40}.dark-style .app-chat .app-chat-contacts .chat-actions .chat-search-input,.dark-style .app-chat .app-chat-sidebar-left .chat-actions .chat-search-input{background-color:#232333}.dark-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active,.dark-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active{color:#fff}.dark-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active h6,.dark-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active .text-muted,.dark-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active h6,.dark-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active .text-muted{color:#fff !important}.dark-style .app-chat .app-chat-contacts .sidebar-body .chat-contact-list li.active .avatar,.dark-style .app-chat .app-chat-sidebar-left .sidebar-body .chat-contact-list li.active .avatar{border-color:#2b2c40}.dark-style .app-chat .app-chat-history{background-color:#232333}.dark-style .app-chat .app-chat-history .chat-history-wrapper .chat-history-header{background-color:#2b2c40}.dark-style .app-chat .app-chat-history .chat-history-footer{background-color:#2b2c40;box-shadow:0 .125rem .25rem rgba(0,0,0,.25)}.dark-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message .chat-message-text{background-color:#2b2c40;box-shadow:0 .125rem .25rem rgba(0,0,0,.25)}.dark-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right{justify-content:flex-end}.dark-style .app-chat .app-chat-history .chat-history-body .chat-history .chat-message.chat-message-right .chat-message-text{color:#fff}.dark-style .app-chat .app-chat-sidebar-right{background-color:#2b2c40}[dir=rtl] .app-chat .app-chat-sidebar-left,[dir=rtl] .app-chat .app-chat-contacts{right:calc(-21rem - 1rem);left:auto}[dir=rtl] .app-chat .app-chat-sidebar-left.show,[dir=rtl] .app-chat .app-chat-contacts.show{left:auto;right:0}[dir=rtl] .app-chat .app-chat-sidebar-right{left:calc(-21rem - 1rem);right:auto}[dir=rtl] .app-chat .app-chat-sidebar-right.show{left:0;right:auto}[dir=rtl] .app-chat .app-chat-history .chat-history-body .chat-history .chat .user-avatar{margin-left:1rem;margin-right:0}[dir=rtl] .app-chat .app-chat-history .chat-message:not(.chat-message-right) .chat-message-text{border-top-right-radius:0;border-top-left-radius:.375rem !important}[dir=rtl] .app-chat .app-chat-history .chat-message.chat-message-right .chat-message-text{border-top-left-radius:0;border-top-right-radius:.375rem !important}

</style>
