import axios from 'axios';
import router from '@/router';

export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{},
        token:"",
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        },
        token(state){
            return state.token
        },
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
        SET_TOKEN (state, value) {
            state.token = value
        },
    },
    actions:{
        login(context,payload){
            context.commit('SET_TOKEN',payload.usertoken)
            context.commit('SET_USER',payload.user)
            context.commit('SET_AUTHENTICATED',true)
            router.push({name:'admin.dashboard'})
        },
        logout({commit}){
            commit('SET_TOKEN',{})
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
            router.push({name:'admin.login'})
        },
        logout2({commit}){
            commit('SET_TOKEN',{})
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
        }
    }
}
