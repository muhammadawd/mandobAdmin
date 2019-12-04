window._ = require('lodash');
window.queryString = require('query-string');

import {helper} from "@/bootstrap/helper";
import ls from '@/bootstrap/localStorageService'
import serviceAPI from '@/bootstrap/serviceAPI'

window.helper = helper;
window.serviceAPI = serviceAPI;
window.ls = ls;

try {
  window.$ = window.jQuery = require('jquery')

} catch (e) {
  // console.error('jquery not found')
}

// try {
//   window.axios = require('axios');
//   window.axios.defaults.headers.common['Content-Type'] = 'application/json';
//   // window.axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";
//   // window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
//   // let token = localStorage.getItem('auth_token');
//   if (token) {
//     // window.axios.defaults.headers.common['Accept'] = 'application/json';
//     // window.axios.defaults.headers.common['Content-Type'] = 'application/json';
//     // window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   }
//
// } catch (e) {
//   // console.error('axios not found')
// }
