import axios from "axios";
import store from '../../store/index'

import url from './url'
const { backendurl,frontendurl } = url();


const full_url = backendurl+'/api/';

let BaseApi = axios.create({
  baseURL: full_url
});

let api = function() {
  let token = store.getters["auth/token"];
  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return BaseApi;
};

export default api;
