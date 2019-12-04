import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(Router);

const router = new Router({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: 'dashboard',
            component: DashboardLayout,
            children: [
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/',
                    name: 'dashboard',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/mandoob',
                    name: 'mandoob',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Mandoob.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/clients',
                    name: 'clients',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Client.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/customers',
                    name: 'customers',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Customer.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/supervisor',
                    name: 'supervisor',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Supervisor.vue')
                },
            ]
        },
        {
            path: '/',
            redirect: 'login',
            component: AuthLayout,
            children: [
                {
                    meta: {
                        requiresAuth: false,
                    },
                    path: '/login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth_data = ls.getFromStorage('auth_data');
        // this route requires auth, check if logged in
        if (!auth_data) {
            next()
            // next({
            //     name: 'login', // query: {redirect: to.fullPath}
            // })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
});

export default router;
