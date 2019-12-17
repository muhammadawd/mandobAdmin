<template>
    <div>

        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-primary btn-icon btn-icon-only" @click="showModal()">
                        <i class="ni ni-fat-add ni-lg pt-1"></i>
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
                                        <th>{{$ml.get('phone')}}</th>
                                        <th>{{$ml.get('customer_experience')}}</th>
                                        <th>{{$ml.get('customer_type')}}</th>
                                        <th>{{$ml.get('clients')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.name}}
                                        </td>
                                        <td>
                                            {{row.phone}}
                                        </td>
                                        <td>
                                            <slot v-if="row.customer_experience">
                                                {{row.customer_experience.translated.title}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.type">
                                                {{row.type.translated.title}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.client">
                                                {{row.client.name}}
                                            </slot>
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteCustomer(row)">
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
                        <label>{{$ml.get('phone')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.phone">
                        <div class="text-danger error_text" id="phone_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('clients')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.client_id">
                            <option v-for="(item , key) in allClients" :value="item.id"
                                    :key="key">
                                {{item.name}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="client_id_error"></div>
                    </div>
                    <div class="col-md-12"></div>
                    <div class="col-md-4">
                        <label>{{$ml.get('city')}}</label>
                        <multiselect v-model="selectValue" :options="allGovernorates" :multiple="false"
                                     group-values="cities"
                                     group-label="name" :group-select="false" :placeholder="$ml.get('search')"
                                     track-by="name" label="name">
                            <span slot="noResult">Oops! No elements found. </span>
                        </multiselect>
                        <div class="text-danger error_text" id="city_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('customer_experience')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.customer_experience_id">
                            <option v-for="(item , key) in statusModel.customer_experience" :value="item.id" :key="key">
                                {{item.translated.title}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="customer_experience_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('customer_type')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.type_id">
                            <option v-for="(item , key) in statusModel.customer_type" :value="item.id" :key="key">
                                {{item.translated.title}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="type_id_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addCustomer()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
                        <button class="btn btn-info" @click="updateCustomer()" v-if="dataModel.id">
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

    export default {
        data() {
            return {
                selectValue: null,
                tableData: [],
                allClients: [],
                isLoading: true,
                disable: false,
                allGovernorates: [],
                statusModel: {
                    customer_experience: [],
                    customer_type: [],
                },
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
            vm.getAllClients();
            vm.getAllCustomers();
            vm.getallGovernorates();
            vm.getAllStatus();
        },
        components: {
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
            getAllStatus() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_STATUS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.statusModel.customer_experience = response.data.status.customer_experience;
                                vm.statusModel.customer_type = response.data.status.customer_type;
                            }
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.statusModel.customer_experience = [];
                        vm.statusModel.customer_type = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getallGovernorates() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_GOVERNORATES)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.allGovernorates = response.data.governorates;
                                return null;
                            }
                            vm.allGovernorates = [];
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.allGovernorates = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getAllClients() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_CLIENTS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.allClients = response.data.clients.data;
                                return null;
                            }
                            vm.allClients = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.allClients = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getAllCustomers() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_CUSTOMERS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.customers.data;
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
            deleteCustomer: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_CUSTOMERS+ `/${row.id}`)
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
            addCustomer: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                console.log(request_data)
                // return
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_CUSTOMERS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let customer = response.data.customer;
                                vm.tableData.push(customer);
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
            updateCustomer: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_CUSTOMERS, request_data)
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
                                let customer = response.data.customer;
                                vm.tableData.push(customer);
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
                    "phone": "",
                    "customer_experience_id": "",
                    "client_id": "",
                    "city_id": "",
                    "type_id": "",
                    "created_at": "",
                    "updated_at": "",
                    "city": {
                        "id": "",
                        "governorate_id": "",
                        "name": "",
                        "name_en": "",
                        "translated": {
                            "title": "",
                        },
                        "governorate": {
                            "id": "",
                            "name": "",
                            "name_en": "",
                            "translated": {
                                "title": "",
                            }
                        }
                    },
                    "customer_experience": {
                        "id": "",
                        "title_ar": "",
                        "title_en": "",
                        "type": "",
                        "created_at": "",
                        "updated_at": "",
                        "translated": {
                            "title": ""
                        }
                    },
                    "type": {
                        "id": "",
                        "title_ar": "",
                        "title_en": "",
                        "type": "",
                        "created_at": "",
                        "updated_at": "",
                        "translated": {
                            "title": " "
                        }
                    },
                    "client": {
                        "id": "",
                        "addressText": "",
                        "email": "",
                        "lat": "",
                        "lng": "",
                        "mobile": "",
                        "name": "",
                        "phone": "",
                        "city_id": "",
                        "status_id": "",
                        "transaction_status_id": "",
                        "shopCreationDate": "",
                        "created_at": "",
                        "updated_at": "",
                    }
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
