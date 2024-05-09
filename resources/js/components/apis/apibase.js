import axios from "axios";

import url from './url'
const { backendurl,frontendurl } = url();

const full_url = backendurl+'/api/';

let BaseApi = axios.create({
  baseURL: full_url
});

let apibase = function() {
  return BaseApi;
};

export default apibase;
