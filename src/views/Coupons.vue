<template>
    <div>

        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-info btn-icon btn-icon-only" @click="showModal()">
                        <i class="ni ni-fat-add ni-lg pt-1"></i>
                    </button>
                    &nbsp;
                    <button class="btn btn-warning" @click="showModal2()">
                        {{$ml.get('add_coupon_value')}}
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
                                        <th>{{$ml.get('code')}}</th>
                                        <th>{{$ml.get('value')}}</th>
                                        <th>{{$ml.get('delivered_at')}}</th>
                                        <th>{{$ml.get('finished_at')}}</th>
                                        <th>{{$ml.get('created_at')}}</th>
                                        <th>{{$ml.get('customers')}}</th>
                                        <th>{{$ml.get('mandoob')}}</th>
                                        <th>{{$ml.get('clients')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.code}}
                                        </td>
                                        <td>
                                            {{row.value}}
                                        </td>
                                        <td>
                                            {{row.delivered_at}}
                                        </td>
                                        <td>
                                            {{row.finished_at}}
                                        </td>
                                        <td>
                                            {{row.created_at}}
                                        </td>
                                        <td>
                                            <slot v-if="row.customer">
                                                {{row.customer.name}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.mandoob">
                                                {{row.mandoob.first_name}}
                                                {{row.mandoob.last_name}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.client">
                                                {{row.client.name}}
                                            </slot>
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteCoupon(row)">
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
                        <label>{{$ml.get('code')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.code">
                        <div class="text-danger error_text" id="code_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('value')}}</label>
                        <select class="form-control" v-model="dataModel.coupon_value_id">
                            <option v-for="(item , index) in all_coupon_values" :value="item.id">{{item.value}}</option>
                        </select>
                        <div class="text-danger error_text" id="coupon_value_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('created_at')}}</label>
                        <flat-pickr class="form-control" v-model="dataModel.created_at"></flat-pickr>
                        <div class="text-danger error_text" id="created_at_error"></div>
                    </div>
                    <div class="col-md-4" v-if="dataModel.id">
                        <label>{{$ml.get('finished_at')}}</label>
                        <flat-pickr class="form-control" v-model="dataModel.finished_at"></flat-pickr>
                        <div class="text-danger error_text" id="finished_at_error"></div>
                    </div>
                    <div class="col-md-12"></div>
                    <div class="col-md-4">
                        <label class="text-white font-weight-bold">{{$ml.get('customers')}}</label>
                        <multiselect v-model="selectCustomer" :options="all_customers" label="name" track-by="name"
                                     :placeholder="$ml.get('search')"></multiselect>
                        <div class="text-danger error_text" id="customer_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label class="text-white font-weight-bold">{{$ml.get('clients')}}</label>
                        <multiselect v-model="selectClient" :options="all_clients" label="name" track-by="name"
                                     :placeholder="$ml.get('search')"></multiselect>
                        <div class="text-danger error_text" id="client_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label class="text-white font-weight-bold">{{$ml.get('mandoob')}}</label>
                        <multiselect v-model="selectMandoob" :options="all_mandoobs" label="name" track-by="name"
                                     :custom-label="nameFirstlast"
                                     :placeholder="$ml.get('search')"></multiselect>
                        <div class="text-danger error_text" id="mandoob_id_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addCoupon()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
                        <button class="btn btn-info" @click="updateCoupon()" v-if="dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('edit')}}</slot>
                        </button>
                    </div>
                </div>
            </sweet-modal>
            <sweet-modal modal-theme="dark" overlay-theme="dark" :ref="'addModal2'">
                <div class="row text-right">
                    <div class="col-md-12">
                        <label>{{$ml.get('value')}}</label>
                        <input type="text" class="form-control" v-model="value">
                        <div class="text-danger error_text" id="value_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addCouponValue()">
                            <slot>{{$ml.get('add')}}</slot>
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

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        data() {
            return {
                selectValue: null,
                image: '',
                value: null,
                all_coupon_values: [],
                tableData: [],
                all_mandoobs: [],
                selectMandoob: null,
                all_customers: [],
                selectCustomer: null,
                all_clients: [],
                selectClient: null,
                isLoading: true,
                disable: false,
                dataModel: {}
            }
        },
        mounted() {
            let vm = this;
            vm.getAllCoupons();
            vm.getAllCouponValues();

            vm.getAllMandoob();
            vm.getAllClients();
            vm.getAllCustomers();
        },
        components: {
            Multiselect,
            flatPickr,
            SweetModal,
            SweetModalTab
        },
        methods: {
            nameFirstlast({first_name, last_name}) {
                return `${first_name} - ${last_name}`
            },
            getAllMandoob() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_MANDOOBS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.all_mandoobs = response.data.mandoobs.data;
                                return null;
                            }
                            vm.all_mandoobs = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.all_mandoobs = [];
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
                                vm.all_clients = response.data.clients.data;
                                return null;
                            }
                            vm.all_clients = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.all_clients = [];
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
                                vm.all_customers = response.data.customers.data;
                                return null;
                            }
                            vm.all_customers = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.all_customers = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            handleFileUpload() {
                let vm = this;
                vm.dataModel.image = this.$refs.image.files[0];
            },
            showModal() {
                let vm = this;
                vm.resetModelData();
                vm.selectCustomer = null;
                vm.selectClient = null;
                vm.selectMandoob = null;
                vm.$refs.addModal.open();
            },
            showModal2() {
                let vm = this;
                vm.resetModelData();
                vm.selectCustomer = null;
                vm.selectClient = null;
                vm.selectMandoob = null;
                vm.$refs.addModal2.open();
            },
            showUpdateModal(data) {
                let vm = this;
                vm.dataModel = data;
                // vm.selectValue = data.city;
                vm.selectCustomer = data.customer;
                vm.selectClient = data.client;
                vm.selectMandoob = data.mandoob;
                vm.$refs.addModal.open();
            },
            getAllCouponValues() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_COUPONS_VALUES)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.all_coupon_values = response.data.couponValues;
                                return
                            }

                            vm.all_coupon_values = [];
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.all_coupon_values = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getAllCoupons() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_COUPONS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.coupons.data;
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
            deleteCoupon: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_COUPONS + `/${row.id}`)
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
            addCoupon: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let customer_id = vm.selectCustomer ? vm.selectCustomer.id : null;
                let client_id = vm.selectClient ? vm.selectClient.id : null;
                let mandoob_id = vm.selectMandoob ? vm.selectMandoob.id : null;
                request_data.customer_id = customer_id;
                request_data.client_id = client_id;
                request_data.mandoob_id = mandoob_id;
                console.log(request_data)
                // let formData = new FormData();
                // formData.append('code', request_data.code)
                // formData.append('coupon_value_id', request_data.coupon_value_id)
                // formData.append('created_at', request_data.created_at)
                // formData.append('customer_id ', request_data.customer_id)
                // formData.append('client_id ', request_data.client_id)
                // formData.append('mandoob_id', request_data.mandoob_id)
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_COUPONS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let coupon = response.data.coupon;
                                vm.tableData.push(coupon);
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
            addCouponValue: function () {
                let vm = this;
                let request_data = {value: vm.value};
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_COUPONS_VALUES, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let couponValue = response.data.couponValue;
                                vm.all_coupon_values.push(couponValue);
                                vm.$refs.addModal2.close();
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            updateCoupon: function () {
                let vm = this;
                let request_data = vm.dataModel;
                let customer_id = vm.selectCustomer ? vm.selectCustomer.id : null;
                let client_id = vm.selectClient ? vm.selectClient.id : null;
                let mandoob_id = vm.selectMandoob ? vm.selectMandoob.id : null;
                request_data.customer_id = customer_id;
                request_data.client_id = client_id;
                request_data.mandoob_id = mandoob_id;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_COUPONS, request_data)
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
                                let coupon = response.data.coupon;
                                vm.tableData.push(coupon);
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
                    code: "",
                    owner_name: "",
                    image: "",
                    image_path: "",
                    warranty_certificate: "",
                    coupon_value_id: "",
                    created_at: "",
                    delivered_at: "",
                    finished_at: "",
                    id: "",
                    updated_at: "",
                    value: "",
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
