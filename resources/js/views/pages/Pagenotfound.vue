<script setup>

</script>

<template>
    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img
              :src="$frontendurl+'/assets/img/mlogo.jpg'"
              alt="auth-login-cover"
              class="img-fluid my-5 auth-illustration"
              style="width:400px;"
            />
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
            <h3 class="mb-1">Page not found</h3>
            <p class="mb-4">Back to previous page?</p>



            <button @click="$router.back()" class="btn btn-success d-grid w-100">
                Back
            </button>


            <div class="divider my-4">
              <div class="divider-text">-</div>
            </div>

            <div class="justify-content-center"><center><b>Developed by   </b>
                <img :src="$frontendurl+'/logo-developer2.png'" style="width: 100px;"></center></div>
          </div>
        </div>
      </div>
    </div>

</template>

