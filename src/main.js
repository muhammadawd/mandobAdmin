import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './bootstrap/ml'
import ArgonDashboard from './plugins/argon-dashboard'
import VueFirestore from 'vue-firestore'
import Firebase from 'firebase'
require('firebase/firestore')

import VueSweetalert2 from 'vue-sweetalert2';


Vue.use(VueSweetalert2);
Vue.use(VueFirestore)
Vue.use(ArgonDashboard)

let firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyAGXmTxdCnbVMgBUtTVPu385ngLQcseLKk",
    authDomain: "mandoob-dffb4.firebaseapp.com",
    databaseURL: "https://mandoob-dffb4.firebaseio.com",
    projectId: "mandoob-dffb4",
    storageBucket: "mandoob-dffb4.appspot.com",
    messagingSenderId: "24748679302",
    appId: "1:24748679302:web:cbe6188fa02158fcf07107",
    measurementId: "G-BGQ4HL4KDG"
});
const firestore = firebaseApp.firestore();

Vue.config.productionTip = false
import 'sweetalert2/dist/sweetalert2.min.css';

new Vue({
    router,
    firebase: function () {
        return firebaseApp;
    },
    firestore: function () {
        return {
            raw_clients: firestore.collection('raw_clients'),
            raw_mandoobs: firestore.collection('raw_mandoobs'),
            raw_visits: firestore.collection('raw_visits'),
            raw_visits_lines: firestore.collection('raw_visits_lines'),
        }
    },
    render: h => h(App)
}).$mount('#app');
