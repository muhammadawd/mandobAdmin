<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <side-bar
                :background-color="sidebarBackground"
                short-title="Delegate"
                title="Delegate">
            <template slot="links">
                <sidebar-item
                        :link="{
            name: $ml.get('dashboard'),
            icon: 'ni ni-tv-2 text-primary',
            path: '/'
          }"/>

                <sidebar-item
                        v-if="$helper.hasAccessPermission('clients')"
                        :link="{name: $ml.get('clients'), icon: 'ni ni-archive-2 text-default', path: '/clients'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('supervisors')"
                        :link="{name: $ml.get('supervisor'), icon: 'ni ni-vector text-primary', path: '/supervisor'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('mandoobs')"
                        :link="{name: $ml.get('mandoob'), icon: 'ni ni-delivery-fast text-default', path: '/mandoob'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('customers')"
                        :link="{name: $ml.get('customers'), icon: 'ni ni-circle-08 text-primary', path: '/customers'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('coupons')"
                        :link="{name: $ml.get('coupons'), icon: 'ni ni-badge text-default', path: '/coupons'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('employees')"
                        :link="{name: $ml.get('employee'), icon: 'fa fa-user text-default', path: '/employee'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('absence')"
                        :link="{name: $ml.get('attendance'), icon: 'ni ni-key-25 text-primary', path: '/attendance'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('location')"
                        :link="{name: $ml.get('locations'), icon: 'ni ni-map-big text-default', path: '/locations'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('violation')"
                        :link="{name: $ml.get('violation'), icon: 'ni ni-collection text-primary', path: '/violation'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('endcustomers')"
                        :link="{name: $ml.get('end_customer'), icon: 'fa fa-users text-default', path: '/end_customer'}"/>
                <sidebar-item
                        v-if="$helper.hasAccessPermission('alerts')"
                        :link="{name: $ml.get('push_notifications'), icon: 'fa fa-globe text-primary', path: '/push_notifications'}"/>

                <li class="nav-item"
                    v-if="$helper.hasAccessPermission('reports')">
                    <a class="nav-link" href="#" data-toggle="collapse" @click="collapse('navbar-reports',this)"
                       aria-expanded="true">
                        <i class="ni ni-briefcase-24 text-default"></i>
                        <span class="nav-link-text">{{$ml.get('reports')}}</span>
                    </a>
                    <div class="collapse " id="navbar-reports">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-expenses')"
                                        :to="{name:'expenses_report'}">
                                    {{$ml.get('mandoob_expenses_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-visit')"
                                        :to="{name:'visits_report'}">
                                    {{$ml.get('mandoob_visits_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-client')"
                                        :to="{name:'client_report'}">
                                    {{$ml.get('mandoob_clients_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-coupon')"
                                        :to="{name:'coupons_report'}">
                                    {{$ml.get('mandoob_coupons_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('create-absence')"
                                        :to="{name:'attendance_report'}">
                                    {{$ml.get('attendance_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-endcustomer')"
                                        :to="{name:'endcustomer_report'}">
                                    {{$ml.get('endcustomer_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-employee')"
                                        :to="{name:'employees_report'}">
                                    {{$ml.get('employees_report')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        v-if="$helper.hasAccessPermission('report-customer')"
                                        :to="{name:'customers_report'}">
                                    {{$ml.get('customers_report')}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item"
                    v-if="$helper.hasAccessPermission('setting')">
                    <a class="nav-link" href="#" data-toggle="collapse" @click="collapse('navbar-setting',this)"
                       aria-expanded="true">
                        <i class="ni ni-settings text-primary"></i>
                        <span class="nav-link-text">{{$ml.get('settings')}}</span>
                    </a>
                    <div class="collapse " id="navbar-setting">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        :to="{name:'admins'}">
                                    {{$ml.get('admins')}}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                        class="nav-link"
                                        :to="{name:'roles'}">
                                    {{$ml.get('roles')}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </template>
        </side-bar>
        <div class="main-content" :data="sidebarBackground">
            <dashboard-navbar></dashboard-navbar>

            <div @click="toggleSidebar">
                <fade-transition :duration="200" origin="center top" mode="out-in">
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
                <content-footer v-if="!$route.meta.hideFooter"></content-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import DashboardNavbar from './DashboardNavbar.vue';
    import ContentFooter from './ContentFooter.vue';
    import {FadeTransition} from 'vue2-transitions';

    export default {
        components: {
            DashboardNavbar,
            ContentFooter,
            FadeTransition
        },
        data() {
            return {
                sidebarBackground: 'blue' //vue|blue|orange|green|red|primary
            };
        },
        methods: {
            collapse(id, item) {
                $(`#${id}`).toggleClass('show')
                if ($(`#${id}`).siblings().attr('aria-expanded') == 'true') {
                    $(`#${id}`).siblings().attr('aria-expanded', "false")
                } else {
                    $(`#${id}`).siblings().attr('aria-expanded', "true")
                }
            },
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            }
        }
    };
</script>
<style lang="scss">
</style>
