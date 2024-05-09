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
    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center ">
            <div class="image-container-cus">
            <img
              :src="$backendurl+'/resources/setting/'+setting_admin?.logo_backend"
              alt="auth-login-cover"
              class="img-fluid my-5 auth-illustration"
              style="width:300px;mix-blend-mode:multiply;height: auto;"
            />
            </div>

            <img
              :src="$frontendurl+'/assets/img/illustrations/bg-shape-image-light.png'"
              alt="auth-login-cover"
              class="platform-bg"
            />
          </div>

        </div>

        <!-- {{ store.getters["auth/authenticated"] }} -->
        <div class="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
          <div class="w-px-400 mx-auto">
            <h4 class="mb-1">Welcome to {{ setting_admin?.site_name }}</h4>
            <p class="mb-4">Please enter your information to sign in</p>

            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                <div class="alert alert-success">
                    <ul class="mb-0" style="font-family: 'Nunito';">
                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                    </ul>
                </div>
            </div>

            <form action="javascript:void(0)" class="mb-3" method="POST">
              <div class="mb-3">
                <label for="email" class="form-label">Email or username</label>
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
                    <small>Forget your password?</small>
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
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <button :disabled="processing" @click="login" class="btn btn-success d-grid w-100">
                {{ processing ? "Please wait" : "Sign in" }}
              </button>
            </form>

            <p class="text-center">
              <span>Dont have an account ? </span>
              <a href="#">
                <span> Create account</span>
              </a>
            </p>

            <div class="divider my-4">
              <div class="divider-text">Developer by</div>
            </div>

            <div class="justify-content-center">
                <center>
                   <img :src="$frontendurl+'/logo-developer2.png'" style="width: 150px;">
                </center>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<style scoped>

</style>

