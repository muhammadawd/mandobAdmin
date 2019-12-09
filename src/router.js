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
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/coupons',
                    name: 'coupons',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Coupons.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/client_report',
                    name: 'client_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/ClientsReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/expenses_report',
                    name: 'expenses_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/ExpensesReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/coupons_report',
                    name: 'coupons_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/CouponsReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                    },
                    path: '/visits_report',
                    name: 'visits_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/VisitsReport.vue')
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
            // next()
            next({
                name: 'login', // query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
});

export default router;
