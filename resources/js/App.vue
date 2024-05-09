<script setup>

import { onMounted ,ref} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import LoadingDiv from './components/lib/admin/layout/LoadingDiv.vue'
import api from "./components/apis/api";
import useReuseableData from "@/components/apis/reuseabledata";
const { setting_public,get_setting_public } = useReuseableData();

import store from './store/index';

import {
  checkauth2
} from './components/apis/auth';

const checking = ref(true);
const checksystem = async () => {
    checkauth2();
    setTimeout(() => {
      checking.value = false;
    }, 1000);
};
onMounted(() => {
    setupSetting();
    checksystem();
    store.dispatch('setting/activemenuchange','Dashboard');
    console.log(store.getters["setting/activemenu"]);
});

const setupSetting = async () => {
    await get_setting_public();
    await store.dispatch('setting/setting_change',setting_public);
};

</script>

<template>
    <LoadingDiv message="Website is loading , please wait." v-if="checking"/>
    <RouterView v-else />
</template>

<style scoped>
</style>
