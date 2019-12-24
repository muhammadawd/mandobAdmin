<template>
    <div>

        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-info btn-icon btn-icon-only" @click="showModal()">
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
                                        <th>{{$ml.get('address')}}</th>
                                        <th>{{$ml.get('phone')}}</th>
                                        <th>{{$ml.get('warranty_certificate')}}</th>
                                        <th>{{$ml.get('image')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.name}}
                                        </td>
                                        <td>
                                            {{row.address}}
                                        </td>
                                        <td>
                                            {{row.phone}}
                                        </td>
                                        <td>
                                            {{row.warranty_certificate}}
                                        </td>
                                        <td>
                                            <slot v-if="row.image">
                                                <a :href="row.image" target="_blank">
                                                    <i class="fas fa-image"></i>
                                                    <b> {{$ml.get('show_image')}}</b>
                                                </a>
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
                        <label>{{$ml.get('warranty_certificate')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.warranty_certificate">
                        <div class="text-danger error_text" id="warranty_certificate_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('customers')}}</label>
                        <multiselect v-model="selectValueCustomer" :options="all_customer" :multiple="false"
                                     :group-select="false" :placeholder="$ml.get('search')"
                                     track-by="name" label="name">
                            <span slot="noResult">Oops! No elements found. </span>
                        </multiselect>
                        <div class="text-danger error_text" id="customer_id_error"></div>
                    </div>
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
                        <label>{{$ml.get('address')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.address">
                        <div class="text-danger error_text" id="address_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('created_at')}}</label>
                        <flat-pickr class="form-control" v-model="dataModel.created_at"></flat-pickr>
                        <div class="text-danger error_text" id="created_at_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('finished_at')}}</label>
                        <flat-pickr class="form-control" v-model="dataModel.finished_at"></flat-pickr>
                        <div class="text-danger error_text" id="finished_at_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('image')}}</label>
                        <input type="file" class="form-control" ref="image" v-on:change="handleFileUpload()"
                               accept="image/*">
                        <div class="text-danger error_text" id="image_error"></div>
                    </div>
                    <div class="col-md-12"></div>
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

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        data() {
            return {
                selectValue: null,
                selectValueCustomer: null,
                allGovernorates: [],
                all_customer: [],
                image: '',
                value: null,
                all_coupon_values: [],
                tableData: [],
                isLoading: true,
                disable: false,
                dataModel: {}
            }
        },
        mounted() {
            let vm = this;
            vm.getAllCustomers();
            vm._getAllCustomers();
            vm.getallGovernorates();
        },
        components: {
            Multiselect,
            flatPickr,
            SweetModal,
            SweetModalTab
        },
        methods: {
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
            _getAllCustomers() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_CUSTOMERS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.all_customer = response.data.customers.data;
                                return null;
                            }
                            vm.all_customer = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.all_customer = [];
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
                vm.$refs.addModal.open();
            },
            showUpdateModal(data) {
                let vm = this;
                vm.dataModel = data;
                vm.selectValue = data.city;
                vm.selectValueCustomer = data.customer;
                vm.$refs.addModal.open();
            },
            getAllCustomers() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_ENDCUSTOMER)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.endCustomers.data;
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_ENDCUSTOMER + `/${row.id}`)
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
                request_data.city_id = vm.selectValue ? vm.selectValue.id : null;
                request_data.customer_id = vm.selectValueCustomer ? vm.selectValueCustomer.id : null;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                console.log(request_data)

                let formData = new FormData();
                formData.append('image', request_data.image)
                formData.append('created_at', request_data.created_at)
                formData.append('finished_at', request_data.finished_at)
                formData.append('name', request_data.name)
                formData.append('phone', request_data.phone)
                if (request_data.address) formData.append('address', request_data.address)
                formData.append('warranty_certificate', request_data.warranty_certificate)
                if (request_data.city_id) formData.append('city_id', request_data.city_id);
                if (request_data.customer_id) formData.append('customer_id', request_data.customer_id);

                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_ENDCUSTOMER, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let endCustomer = response.data.endCustomer;
                                vm.tableData.push(endCustomer);
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
                request_data.city_id = vm.selectValue ? vm.selectValue.id : null;
                request_data.customer_id = vm.selectValueCustomer ? vm.selectValueCustomer.id : null;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                console.log(request_data)

                let formData = new FormData();
                if (request_data.image) formData.append('image', request_data.image)
                if (request_data.id) formData.append('id', request_data.id)
                if (request_data.created_at) formData.append('created_at', request_data.created_at)
                if (request_data.finished_at) formData.append('finished_at', request_data.finished_at)
                if (request_data.name) formData.append('name', request_data.name)
                if (request_data.phone) formData.append('phone', request_data.phone)
                if (request_data.address) formData.append('address', request_data.address)
                if (request_data.warranty_certificate) formData.append('warranty_certificate', request_data.warranty_certificate)
                if (request_data.city_id) formData.append('city_id', request_data.city_id);
                if (request_data.customer_id) formData.append('customer_id', request_data.customer_id);
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_ENDCUSTOMER, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
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
                    name: "",
                    phone: "",
                    image: "",
                    image_path: "",
                    warranty_certificate: "",
                    created_at: "",
                    finished_at: "",
                    id: "",
                    updated_at: "",
                    customer_id: "",
                    city_id: "",
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
