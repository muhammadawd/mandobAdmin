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
                        premission: 'ALLOW_ALL',
                    },
                    path: '/',
                    name: 'dashboard',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'mandoobs',
                    },
                    path: '/mandoob',
                    name: 'mandoob',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Mandoob.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'employees',
                    },
                    path: '/employee',
                    name: 'employee',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Employee.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'violation',
                    },
                    path: '/violation',
                    name: 'violation',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Violation.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'location',
                    },
                    path: '/locations',
                    name: 'locations',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Locations.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'alerts',
                    },
                    path: '/push_notifications',
                    name: 'push_notifications',
                    component: () => import(/* webpackChunkName: "demo" */ './views/PushNotifications.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'clients',
                    },
                    path: '/clients',
                    name: 'clients',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Client.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'ALLOW_ALL',
                    },
                    path: '/clients/:id',
                    name: 'show_client',
                    component: () => import(/* webpackChunkName: "demo" */ './views/ClientProfile.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'customers',
                    },
                    path: '/customers',
                    name: 'customers',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Customer.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'supervisors',
                    },
                    path: '/supervisor',
                    name: 'supervisor',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Supervisor.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'coupons',
                    },
                    path: '/coupons',
                    name: 'coupons',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Coupons.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'setting',
                    },
                    path: '/admins',
                    name: 'admins',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Admin.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'setting',
                    },
                    path: '/roles',
                    name: 'roles',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Roles.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'ALLOW_ALL',
                    },
                    path: '/roles/add',
                    name: 'add_roles',
                    component: () => import(/* webpackChunkName: "demo" */ './views/AddRoles.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'ALLOW_ALL',
                    },
                    path: '/roles/edit/:id',
                    name: 'edit_roles',
                    component: () => import(/* webpackChunkName: "demo" */ './views/EditRoles.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'endcustomers',
                    },
                    path: '/end_customer',
                    name: 'end_customer',
                    component: () => import(/* webpackChunkName: "demo" */ './views/EndCustomer.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'ALLOW_ALL',
                    },
                    path: '/end_customer/:id',
                    name: 'end_customer_details',
                    component: () => import(/* webpackChunkName: "demo" */ './views/EndCustomerDetails.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/client_report',
                    name: 'client_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/ClientsReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/expenses_report',
                    name: 'expenses_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/ExpensesReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/coupons_report',
                    name: 'coupons_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/CouponsReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/visits_report',
                    name: 'visits_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/VisitsReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/attendance_report',
                    name: 'attendance_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/AttendanceReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/employees_report',
                    name: 'employees_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/EmployeesReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/endcustomer_report',
                    name: 'endcustomer_report',
                    component: () => import(/* webpackChunkName: "demo" */ './views/reports/EndCustomerReport.vue')
                },
                {
                    meta: {
                        requiresAuth: true,
                        premission: 'reports',
                    },
                    path: '/attendance',
                    name: 'attendance',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Attendance.vue')
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
                    path: '/page403',
                    name: 'page403',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Page403.vue')
                },
                {
                    meta: {
                        requiresAuth: false,
                    },
                    path: '*',
                    name: 'page404',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Page404.vue')
                },
                {
                    meta: {
                        requiresAuth: false,
                    },
                    path: '/login',
                    name: 'login',
                    component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
                },
                {
                    meta: {
                        requiresAuth: false,
                    },
                    path: '/reset_password/:token',
                    name: 'reset_password',
                    component: () => import(/* webpackChunkName: "demo" */ './views/ResetPassword.vue')
                }
            ]
        }
    ]
});

function getAuth() {
    window.serviceAPI.API().get(window.serviceAPI.AUTH_ADMIN)
        .then((response) => {
            response = response.data
            if (response.status) {
                let permissions = _.map(response.data.admin.role.permissions, 'name');
                let auth_data = JSON.parse(window.ls.getFromStorage('auth_data'));
                auth_data.permissions = permissions;
                $('#notification_count').text(response.data.alert_count);
                window.ls.saveToStorage('auth_data', auth_data)
            }
        })
        .catch((errors) => {
            console.log(errors)
        })
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth_data = ls.getFromStorage('auth_data');
        // this route requires auth, check if logged in
        if (!helper.hasAccessPermission(to.meta.premission)) {
            next({
                name: 'page403',
            })
        }
        if (!auth_data) {
            // next()
            next({
                name: 'login', // query: {redirect: to.fullPath}
            })
        } else {
            next()
            getAuth();
        }
    } else {
        next() // make sure to always call next()!
    }
});

export default router;
