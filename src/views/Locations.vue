<template>
    <div>

        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-danger" @click="showNotifactionModal()">
                        {{$ml.get('send_fcm')}}
                    </button>
                    &nbsp;
<!--                    <button class="btn btn-primary" @click="$router.push({name:'push_notifications'})">-->
<!--                        {{$ml.get('push_notifications')}}-->
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
                            <div class="row p-2 mt-2 mb-2">
                                <div class="col-md-3 text-right">
                                    <label class="font-weight-bold">{{$ml.get('mandoob')}}</label>
                                    <multiselect v-model="selectMandoob" :options="allMandoobs"
                                                 :custom-label="customLabel"
                                                 :placeholder="$ml.get('search')"></multiselect>
                                </div>
                                <div class="col-md-3 text-right">
                                    <label class="font-weight-bold">{{$ml.get('date')}}</label>
                                    <flat-pickr class="form-control text-center form-control-alternative" dir="ltr"
                                                :config="{dateFormat: 'Y-m-d',mode:'range'}"
                                                v-model="filterModel.date"></flat-pickr>
                                </div>
                                <div class="col-md-12 text-right mt-1">
                                    <button class="btn btn-info btn-md" @click="getAllLocations()">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <base-table class="table align-items-center table-flush"
                                            :class="'table-darks'"
                                            :thead-classes="'thead-darks'"
                                            tbody-classes="list"
                                            :data="tableData">
                                    <template slot="columns">
                                        <th>{{$ml.get('lat')}}</th>
                                        <th>{{$ml.get('lng')}}</th>
                                        <th>{{$ml.get('mandoob')}}</th>
                                        <th>{{$ml.get('date')}}</th>
                                        <th>{{$ml.get('status')}}</th>
                                        <th>{{$ml.get('address')}}</th>
                                        <th>{{$ml.get('nearest_client')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.lat}}
                                        </td>
                                        <td>
                                            {{row.lng}}
                                        </td>
                                        <td>
                                            <slot v-if="row.mandoob">
                                                {{row.mandoob.first_name}}
                                                {{row.mandoob.last_name}}
                                            </slot>
                                        </td>
                                        <td>
                                            {{row.created_at}}
                                        </td>
                                        <td>
                                            <label class="badge badge-primary">{{$ml.get(row.status)}}</label>
                                        </td>
                                        <td>
                                            {{row.address}}
                                        </td>
                                        <td>
                                            <slot v-if="row.nearest_client">
                                                {{row.nearest_client.name}}
                                                |
                                                {{row.nearest_client.distance ?
                                                parseFloat(row.nearest_client.distance).toFixed(3) : 0}}
                                                كيلومتر
                                            </slot>
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm"
                                                        @click="showAddViolationModal(row)">
                                                    {{$ml.get('add_violation')}}
                                                </button>
                                                <button class="btn btn-success btn-sm" @click="deleteLocation(row)">
                                                    {{$ml.get('location_ok')}}
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
            <sweet-modal modal-theme="dark" overlay-theme="dark" :ref="'notifactionModal'" width="70%">
                <div class="row text-right">
                    <div class="col-md-6">
                        <label>{{$ml.get('mandoob')}}</label>
                        <multiselect v-model="selectValue" :options="allMandoobs" :multiple="true"
                                     :placeholder="$ml.get('search')"
                                     :custom-label="customLabel">
                            <span slot="noResult">Oops! No elements found.</span>
                        </multiselect>
                        <div class="text-info mt-2 font-weight-bold">
                            {{$ml.get('send_fcm_all')}}
                        </div>
                    </div>
                    <div class="col-md-12">
                        <label>{{$ml.get('text')}}</label>
                        <textarea v-model="message" class="form-control form-control-alternative" rows="6"></textarea>
                        <div class="text-danger error_text" id="message_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="sendNotifications()">
                            <slot>{{$ml.get('send')}}</slot>
                        </button>
                    </div>
                </div>
            </sweet-modal>
            <sweet-modal modal-theme="dark" overlay-theme="dark" :ref="'addModal'" width="70%">
                <div class="row text-right" v-if="dataModel.mandoob">
                    <div class="col-md-12 text-center">
                        <h1 class="text-white">{{$ml.get('add_violation')}}</h1>
                    </div>
                    <div class="col-md-12">
                        <b>{{$ml.get('name')}}: </b>{{dataModel.mandoob.first_name}} {{dataModel.mandoob.last_name}}
                        <br>
                        <b>{{$ml.get('address')}}: </b>{{dataModel.address}}
                        <input type="hidden" v-model="dataViolationModel.mandoob_id = dataModel.mandoob_id">
                        <input type="hidden" v-model="dataViolationModel.location_id = dataModel.id">
                        <hr>
                    </div>
                    <div class="col-md-3">
                        <label class="font-weight-bold">{{$ml.get('date')}}</label>
                        <flat-pickr type="text" class="form-control"
                                    :config="{dateFormat: 'Y-m-d H:i',enableTime:true}"
                                    v-model="dataViolationModel.date = dataModel.created_at"></flat-pickr>
                        <div class="text-danger error_text" id="date_error"></div>
                    </div>
                    <!--                    <div class="col-md-3">-->
                    <!--                        <label class="font-weight-bold">{{$ml.get('value')}}</label>-->
                    <!--                        <input type="text" class="form-control" v-model="dataViolationModel.value">-->
                    <!--                        <div class="text-danger error_text" id="value_error"></div>-->
                    <!--                    </div>-->
                    <div class="col-md-9">
                        <label class="font-weight-bold">{{$ml.get('notes')}}</label>
                        <input type="text" class="form-control" v-model="dataViolationModel.notes">
                        <div class="text-danger error_text" id="notes_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addViolation()">
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
                selectValue: [],
                selectMandoob: null,
                message: null,
                tableData: [],
                isLoading: true,
                disable: false,
                allMandoobs: [],
                dataModel: {},
                dataViolationModel: {},
                filterModel: {}
            }
        },
        watch: {
            selectValue: function (newVal, oldVal) {
                if (newVal.length) {
                    // this.dataModel.city_id = newVal.id
                } else {
                    // this.dataModel.city_id = newVal
                }
            },
        },
        mounted() {
            let vm = this;
            vm.getAllLocations();
            vm.getAllMandoob();
        },
        components: {
            Multiselect,
            SweetModal,
            flatPickr,
            SweetModalTab
        },
        methods: {
            customLabel({first_name, last_name}) {
                return `${first_name} – ${last_name}`
            },
            showModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.addModal.open();
            },
            showAddViolationModal(data) {
                let vm = this;
                vm.dataModel = data;
                vm.$refs.addModal.open();
            },
            showNotifactionModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.notifactionModal.open();
            },
            getAllLocations() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let mandoob_id = vm.selectMandoob ? vm.selectMandoob.id : null
                let start_date = null;
                let end_date = null;
                if (vm.filterModel.date) {
                    let arr = vm.filterModel.date.split(" to ");
                    start_date = arr[0];
                    end_date = arr[1];
                }
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_LOCATIONS, {
                        params: {
                            mandoob_id: mandoob_id,
                            start_date: start_date,
                            end_date: end_date,
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.locations.data;
                            }
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.tableData = [];
                    });
                } catch (e) {
                    console.log(e)
                }
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
                                vm.allMandoobs = response.data.mandoobs.data;
                                return null;
                            }
                            vm.allMandoobs = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.allMandoobs = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            deleteLocation: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_LOCATIONS + `/${row.id}`)
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
            sendNotifications: function () {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.mandoob_ids = _.map(vm.selectValue, 'id');
                request_data.message = vm.message;
                console.log(request_data);
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.SEND_NOTIFICATION_MANDOOBS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                vm.$refs.notifactionModal.close();
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        if (error.response.status != 422) {
                            vm.$refs.notifactionModal.close();
                        }
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            addViolation: function () {
                let vm = this;
                let request_data = vm.dataViolationModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_VIOLATION, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetViolationModel();
                                $('.error_text').text('');
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
            resetModelData() {
                this.selectValue = [];
                this.dataModel = {
                    "id": "",
                    "lat": "",
                    "lng": "",
                    "address": "",
                    "mandoob": null,
                }
            },
            resetViolationModel() {
                this.dataViolationModel = {
                    "id": "",
                    "mandoob_id": "",
                    "value": "",
                    "date": "",
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

    .multiselect__option--highlight::after {
        float: left !important;
        text-align: left;
        left: 0;
        opacity: 0.5;
    }
</style>
