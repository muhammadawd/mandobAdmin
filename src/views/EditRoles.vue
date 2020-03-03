<template>
    <div>

        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <!--                    <button class="btn btn-dark btn-icon" @click="showModal()">-->
                    <!--                        {{$ml.get('add_role')}}-->
                    <!--                        &lt;!&ndash;                        <i class="ni ni-fat-add ni-lg pt-1"></i>&ndash;&gt;-->
                    <!--                    </button>-->
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="col-md-4 text-right">
                                <label class="font-weight-bold ">{{$ml.get('name')}}</label>
                                <input type="text" class="form-control" v-model="dataModel.title_ar">
                                <div class="text-danger error_text" id="title_ar_error"></div>
                            </div>
                            <div class="col-md-12" v-if="tabs.length > 0">
                                <tabs
                                        :tabs="tabs"
                                        :currentTab="currentTab"
                                        :wrapper-class="'default-tabs direction-inverse'"
                                        :tab-class="'default-tabs__item'"
                                        :tab-active-class="'default-tabs__item_active'"
                                        :line-class="'default-tabs__active-line'"
                                        @onClick="handleClick"
                                />
                                <hr class="mt-1">
                                <div class="content">
                                    <div v-if="currentTab">
                                        <div class="row">
                                            <div class="col-md-3 text-right"
                                                 v-for="(permission,key) in currentPermissions" :key="key">
                                                <input :id="'permission_'+permission.id" type="checkbox"
                                                       v-model="selectedPermission" :value="permission.id"/>
                                                <label :for="'permission_'+permission.id">&nbsp;{{permission.translated.title}}
                                                    <br>
                                                    {{permission.name}}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 text-center mt-3">
                                    <button @click="editRole()" class="btn btn-warning">{{$ml.get('edit')}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
    import Multiselect from 'vue-multiselect'
    import 'vue-multiselect/dist/vue-multiselect.min.css'
    import 'flatpickr/dist/flatpickr.css';
    import FlatPickr from "vue-flatpickr-component/src/component";
    import Tabs from 'vue-tabs-with-active-line';


    export default {
        data() {
            return {
                loading: false,
                dataModel: {},
                tabs: [],
                currentTab: 'tab1',
                currentPermissions: [],
                roles: [],
                permissions: [],
                selectedPermission: []
            }
        },
        mounted() {
            let vm = this;
            vm.getAllPermissions();
            vm.findRole();
        },
        components: {
            FlatPickr,
            Multiselect,
            Tabs,
            SweetModal,
            SweetModalTab
        },
        methods: {
            editRole() {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.permission_ids = vm.selectedPermission;
                $('.span-text-validation').text('');
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_ROLES, request_data)
                        .then((response) => {
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                // vm.$router.push({name: 'roles'});
                                return null;
                            }
                        }).catch((error) => {
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            handleClick(newTab) {
                this.currentTab = newTab;
                this.currentPermissions = this.permissions[newTab]
            },
            getAllPermissions() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_PERMISSIONS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.permissions = response.data.permissions;
                                $.each(vm.permissions, function (ine, item) {
                                    vm.tabs.push({title: ine, value: ine})
                                    vm.currentTab = ine;
                                    vm.currentPermissions = vm.permissions[ine];
                                });
                                return null;
                            }
                            vm.permissions = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.permissions = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            findRole() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.FIND_ROLES + `/${vm.$route.params.id}`)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.dataModel = response.data.role;
                                vm.selectedPermission = _.map(response.data.role.permissions, 'id')
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            resetModelData() {
                this.selectValue = null;
                this.dataModel = {
                    "id": "",
                    "name": "",
                    "barcode": "",
                    "email": "",
                    "username": "",
                }
            }
        }
    }
</script>
<style>
    .tabs {
        position: relative;
        margin: 0 auto;
        text-align: right;
    }

    .tabs__item {
        display: inline-block;
        margin: 0 5px;
        padding: 10px;
        padding-bottom: 8px;
        font-size: 16px;
        letter-spacing: 0.8px;
        color: gray;
        text-decoration: none;
        border: none;
        background-color: transparent;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: all 0.25s;
    }

    .tabs__item_active {
        color: black;
    }

    .tabs__item:hover {
        border-bottom: 2px solid gray;
        color: #4f40ff;
    }

    .tabs__item:focus {
        outline: none;
        border-bottom: 2px solid gray;
        color: #4f40ff;
    }

    .tabs__item:first-child {
        margin-left: 0;
    }

    .tabs__item:last-child {
        margin-right: 0;
    }

    .tabs__active-line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #4f40ff;
        transition: transform 0.4s ease, width 0.4s ease;
    }
</style>
