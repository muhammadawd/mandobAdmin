<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <!--            <div class="form-group mb-0">-->
            <!--                <base-input placeholder="Search"-->
            <!--                            class="input-group-alternative"-->
            <!--                            alternative=""-->
            <!--                            addon-right-icon="fas fa-search">-->
            <!--                </base-input>-->
            <!--            </div>-->
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item"  @click="$router.push({name:'push_notifications'})">
                <div lass="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle bg-primary">
                    <i class="fa fa-bell"></i>
                 </span>
                        <div class="media-body ml-2 d-none d-lg-block position-relative">
                            <span class="mb-0 text-sm bg-danger font-weight-bold" id="notification_count"> 0 </span>
                        </div>
                    </div>

                    <!--                    <template>-->
                    <!--                        <div class=" dropdown-header noti-title">-->
                    <!--                            <h6 class="text-overflow m-0">{{$ml.get('welcome')}}!</h6>-->
                    <!--                        </div>-->
                    <!--                        <div class="dropdown-divider"></div>-->
                    <!--                    </template>-->
                </div>
            </li>
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{$ml.get('admin')}} </span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">{{$ml.get('welcome')}}!</h6>
                        </div>
                        <!--                        <router-link to="/profile" class="dropdown-item">-->
                        <!--                            <i class="ni ni-single-02"></i>-->
                        <!--                            <span>My profile</span>-->
                        <!--                        </router-link>-->
                        <!--                        <router-link to="/profile" class="dropdown-item">-->
                        <!--                            <i class="ni ni-settings-gear-65"></i>-->
                        <!--                            <span>Settings</span>-->
                        <!--                        </router-link>-->
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" @click="logout()" style="cursor:pointer;">
                            <span>{{$ml.get('logout')}}</span>
                        </a>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
    export default {
        data() {
            return {
                activeNotifications: false,
                showMenu: false,
                searchQuery: ''
            };
        },
        methods: {
            logout() {
                let vm = this;
                localStorage.removeItem('auth_data')
                vm.$router.push({name: 'login'})
            },
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false);
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
            }
        }
    };
</script>
<style>
    #notification_count {
        position: absolute;
        left: 1px;
        top: -25px;
        color: #FFF;
        background: #F44336;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        padding-top: 2px;
    }
</style>
