<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon">
      <template slot="links">
        <sidebar-item
          :link="{
            name: $ml.get('dashboard'),
            icon: 'ni ni-tv-2 text-primary',
            path: '/'
          }"/>

        <sidebar-item :link="{name: $ml.get('clients'), icon: 'ni ni-archive-2 text-default', path: '/clients'}"/>
        <sidebar-item :link="{name: $ml.get('supervisor'), icon: 'ni ni-vector text-primary', path: '/supervisor'}"/>
        <sidebar-item :link="{name: $ml.get('mandoob'), icon: 'ni ni-delivery-fast text-default', path: '/mandoob'}"/>
        <sidebar-item :link="{name: $ml.get('customers'), icon: 'ni ni-circle-08 text-primary', path: '/customers'}"/>
        <sidebar-item :link="{name: $ml.get('coupons'), icon: 'ni ni-badge text-default', path: '/coupons'}"/>
        <!--        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>-->

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
  import { FadeTransition } from 'vue2-transitions';

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
