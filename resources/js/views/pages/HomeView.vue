<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <main>
    <div class="b-overlay position-absolute" style="inset: 0px; z-index: 10;">
       <div class="position-absolute rounded-sm" style="inset: 0px; opacity: 0.71; backdrop-filter: blur(1px);">
       </div>
       <div class="position-absolute" style="top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);text-align: center;">
            <h1><b>Laravel 11 vue 3</b> - project starter</h1>
            <br/>
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-primary">
                Admin panel
            </RouterLink>
            &nbsp;&nbsp;
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-primary">
                Customer panel
            </RouterLink>
            &nbsp;&nbsp;
            <RouterLink :to="{name:'admin.dashboard'}" class="btn btn-primary">
                Website
            </RouterLink>
       </div>
    </div>
  </main>
</template>
