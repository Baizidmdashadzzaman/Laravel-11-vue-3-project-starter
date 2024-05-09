import axios from 'axios';
import router from '@/router';

export default {
    namespaced: true,
    state:{
        activemenu:"Dashboard",
        setting:{},
        site_url_backend:"",
        site_url_frontend:"",
    },
    getters:{
        activemenu(state){
            return state.activemenu
        },
        setting(state){
            return state.setting
        },
        site_url_backend(state){
            return state.site_url_backend
        },
        site_url_frontend(state){
            return state.site_url_frontend
        },
    },
    mutations:{
        SET_ACTIVEMENU (state, value) {
            state.activemenu = value
        },
        SET_SETTING (state, value) {
            state.setting = value
        },
        SET_SITE_URL_BACKEND (state, value) {
            state.site_url_backend = value
        },
        SET_SITE_URL_FRONTEND (state, value) {
            state.site_url_frontend = value
        },
    },
    actions:{
        activemenuchange(context,payload){
            context.commit('SET_ACTIVEMENU',payload)
        },
        setting_change(context,payload){
            context.commit('SET_SETTING',payload)
        },
        site_url_backend_change(context,payload){
            context.commit('SET_SITE_URL_BACKEND',payload)
        },
        site_url_frontend_change(context,payload){
            context.commit('SET_SITE_URL_FRONTEND',payload)
        },
    }
}
