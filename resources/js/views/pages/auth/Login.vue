<script setup>
import api from "@/components/apis/api";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted ,ref} from 'vue';

import useReuseableData from "@/components/apis/reuseabledata";
const { setting_admin } = useReuseableData();

const backendurl = import.meta.env.VITE_BACKEND_URL;

import {
  checkauth
} from '@/components/apis/auth';

  const auth = ref({
      email: '',
      password: ''
  });
  const validationErrors = ref({});
  const processing = ref(false);

  const store = useStore();
  const router = useRouter();

  const login = async () => {
      processing.value = true;
      await api().post('/login',auth.value).then(({data})=>{
          store.dispatch('auth/login',data);
      }).catch(({response})=>{
         validationErrors.value = response.data.message
      }).finally(()=>{
          processing.value = false
      })
  };

  onMounted(() => {
     checkauth();
  });

</script>

<template>

<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <a href="#" class="app-brand-link gap-2">
              <span class="app-brand-logo demo">
                <img
                  :src="$backendurl+'/resources/setting/'+setting_admin?.logo_backend"
                  style="width:40px;mix-blend-mode:multiply;height: auto;"
                />
              </span>
              <span class="app-brand-text demo text-body fw-bold">{{ setting_admin?.site_name }}</span>
            </a>
          </div>
          <!-- /Logo -->
          <h4 class="mb-2">Welcome to {{ setting_admin?.site_name }} 👋</h4>
          <p class="mb-4">Please sign-in to your account and start the adventure</p>

          <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                <div class="alert alert-primary">
                    <ul class="mb-0" >
                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                    </ul>
                </div>
          </div>
          <form action="javascript:void(0)" class="mb-3" method="POST" >
            <div class="mb-3">
              <label for="email" class="form-label">Email or Username</label>
              <input
                  type="text"
                  v-model="auth.email"
                  name="email"
                  class="form-control"
                  placeholder="Enter your data"
                  autofocus />
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="d-flex justify-content-between">
                <label class="form-label" for="password">Password</label>
                <a href="#">
                  <small>Forgot Password?</small>
                </a>
              </div>
              <div class="input-group input-group-merge">
                <input
                    type="password"
                    v-model="auth.password"
                    class="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="remember-me">
                <label class="form-check-label" for="remember-me">
                  Remember Me
                </label>
              </div>
            </div>
            <div class="mb-3">
              <button :disabled="processing" @click="login" class="btn btn-primary d-grid w-100" type="submit">
                {{ processing ? "Please wait" : "Sign in" }}
              </button>
            </div>
          </form>

          <p class="text-center">
            <span>New on our platform?</span>
            <a href="#">
              <span>Create an account</span>
            </a>
          </p>
          <!-- <div class="justify-content-center">
                <center>
                   <img :src="$frontendurl+'/logo-developer2.png'" style="width: 150px;">
                </center>
          </div> -->
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</div>

</template>

<style scoped>

</style>

