<template>
    <div>

        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-dark btn-icon" @click="showModal()">
                        {{$ml.get('add_admin')}}
                        <!--                        <i class="ni ni-fat-add ni-lg pt-1"></i>-->
                    </button>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="table-responsive">
                                <base-table class="table align-items-center table-flush"
                                            :class="'table-darks'"
                                            :thead-classes="'thead-darks'"
                                            tbody-classes="list"
                                            :data="tableData">
                                    <template slot="columns">
                                        <th>{{$ml.get('name')}}</th>
                                        <th>{{$ml.get('username')}}</th>
                                        <th>{{$ml.get('email')}}</th>
                                        <th>{{$ml.get('barcode')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.name}}
                                        </td>
                                        <td>
                                            {{row.username}}
                                        </td>
                                        <td>
                                            {{row.email}}
                                        </td>
                                        <td>
                                            {{row.barcode}}
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteAdmin(row)">
                                                    <i class="ni ni-fat-remove ni-lg pt-1"></i>
                                                </button>
                                                <button class="btn btn-info btn-sm" @click="showUpdateModal(row)">
                                                    <i class="ni ni-collection ni-lg pt-1"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </template>
                                </base-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <sweet-modal modal-theme="dark" overlay-theme="dark" :ref="'addModal'" width="70%">
                <div class="row text-right">
                    <div class="col-md-4">
                        <label>{{$ml.get('name')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.name">
                        <div class="text-danger error_text" id="name_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('username')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.username">
                        <div class="text-danger error_text" id="username_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('password')}}</label>
                        <input type="password" class="form-control" v-model="dataModel.password">
                        <div class="text-danger error_text" id="password_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('email')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.email">
                        <div class="text-danger error_text" id="email_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('barcode')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.barcode">
                        <div class="text-danger error_text" id="barcode_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('role')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.role_id">
                            <option v-for="(item , key) in roles" :value="item.id" :key="key">{{item.translated.title}}</option>
                        </select>
                        <div class="text-danger error_text" id="role_id_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addAdmin()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
                        <button class="btn btn-info" @click="updateAdmin()" v-if="dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('edit')}}</slot>
                        </button>
                    </div>
                </div>
            </sweet-modal>
        </div>
    </div>
</template>
<script>
    import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
    import Multiselect from 'vue-multiselect'
    import 'vue-multiselect/dist/vue-multiselect.min.css'
    import 'flatpickr/dist/flatpickr.css';
    import FlatPickr from "vue-flatpickr-component/src/component";

    export default {
        data() {
            return {
                selectValue: null,
                tableData: [],
                roles: [],
                isLoading: true,
                disable: false,
                dataModel: {}
            }
        },
        watch: {
            selectValue: function (newVal, oldVal) {
                if (newVal) {
                    this.dataModel.city_id = newVal.id
                } else {
                    this.dataModel.city_id = newVal
                }
            },
        },
        mounted() {
            let vm = this;
            // console.log(this.helper.hasAccessPermission('update-admins'))
            // console.log(this.$pusher)
            vm.getAllAdmins();
            vm.getAllRoles();
        },
        components: {
            FlatPickr,
            Multiselect,
            SweetModal,
            SweetModalTab
        },
        methods: {
            showModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.addModal.open();
            },
            showUpdateModal(data) {
                let vm = this;
                vm.dataModel = data;
                vm.selectValue = data.city;
                vm.$refs.addModal.open();
            },
            getAllAdmins() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_ADMINS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.admins.data;
                                return null;
                            }
                            vm.tableData = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.tableData = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getAllRoles() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_ROLES)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.roles = response.data.roles.data;
                                return null;
                            }
                            vm.roles = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.roles = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            deleteAdmin: function (row) {
                let vm = this;

                vm.$swal({
                    title: vm.$ml.get('confirm_warning'),
                    text: vm.$ml.get('are_you_sure'),
                    type: 'warning',
                    showLoaderOnConfirm: true,
                    showCancelButton: true,
                    confirmButtonText: vm.$ml.get('yes'),
                    cancelButtonText: vm.$ml.get('no')
                }).then((result) => {
                    if (result.value) {
                        vm.$root.$children[0].$refs.loader.show_loader = true;
                        try {
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_ADMINS + `/${row.id}`)
                                .then((response) => {
                                    vm.$root.$children[0].$refs.loader.show_loader = false;
                                    response = response.data;
                                    if (response.status) {
                                        $(`#td_row_${row.id}`).parent().remove();
                                        window.helper.showMessage('success', vm);
                                        return null;
                                    }
                                }).catch((error) => {
                                vm.$root.$children[0].$refs.loader.show_loader = false;
                                window.helper.handleError(error, vm);
                                vm.tableData = [];
                            });
                        } catch (e) {
                            console.log(e)
                        }
                    }
                });
            },
            addAdmin: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_ADMINS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let admin = response.data.admin;
                                vm.tableData.push(admin);
                                vm.$refs.addModal.close();
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        if (error.response.status != 422) {
                            vm.$refs.addModal.close();
                        }
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            updateAdmin: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_ADMINS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                vm.$refs.addModal.close();
                                // location.reload()
                                $(`#td_row_${request_data.id}`).parent().remove();
                                let admin = response.data.admin;
                                vm.tableData.push(admin);
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        if (error.response.status != 422) {
                            vm.$refs.addModal.close();
                        }
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
    .multiselect__option {
        text-align: right;
    }

    .multiselect__option--disabled {
        /*background: #182029 !important;*/
        /*color: #ffffff !important;*/
        font-weight: bold;
        font-size: 18px;
    }
</style>
