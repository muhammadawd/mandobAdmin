<template>
    <div>

        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <button class="btn btn-danger" @click="showNotifactionModal()">
                    {{$ml.get('send_fcm')}}
                </button>
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
                                    <label class="font-weight-bold">{{$ml.get('date')}}</label>
                                    <flat-pickr class="form-control text-center form-control-alternative" dir="ltr"
                                                :config="{dateFormat: 'Y-m-d',mode:'range'}"
                                                v-model="filterModel.date"></flat-pickr>
                                </div>
                                <div class="col-md-12 text-right mt-1">
                                    <button class="btn btn-info btn-md" @click="getAllNotifications()">
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
                                        <th>{{$ml.get('date')}}</th>
                                        <th>{{$ml.get('mandoob')}}</th>
                                        <th>{{$ml.get('text')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.created_at}}
                                        </td>
                                        <td>
                                            <slot v-if="row.mandoob">
                                                {{row.mandoob.first_name}}
                                                {{row.mandoob.last_name}}
                                            </slot>
                                        </td>
                                        <td>

                                        </td>
                                    </template>
                                </base-table>
                            </div>
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
                                 track-by="id"
                                 :custom-label="customLabel">
                        <span slot="noResult">Oops! No elements found.</span>
                    </multiselect>
                    <div class="text-info mt-2 font-weight-bold">
                        {{$ml.get('send_fcm_all')}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label>{{$ml.get('supervisor')}}</label>
                    <multiselect v-model="selectSupervisorsValue" :options="allSupervisors" :multiple="true"
                                 :placeholder="$ml.get('search')"
                                 track-by="id"
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
                allMandoobs: [],
                allSupervisors: [],
                selectSupervisorsValue: [],
                tableData: [],
                message: '',
                isLoading: true,
                disable: false,
                dataModel: {},
                dataViolationModel: {},
                filterModel: {}
            }
        },
        mounted() {
            let vm = this;
            // vm.getAllNotifications();
            vm.getAllMandoob();
            vm.getAllSupervisor();
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
            showNotifactionModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.notifactionModal.open();
            },
            sendNotifications() {
            },
            getAllSupervisor() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_SUPERVISOR)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {

                                console.log(response.data.super_visors)
                                vm.allSupervisors = response.data.super_visors.data;
                                return null;
                            }
                            vm.allSupervisors = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.allSupervisors = [];
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
            getAllNotifications() {
                let vm = this;
                return
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let start_date = null;
                let end_date = null;
                if (vm.filterModel.date) {
                    let arr = vm.filterModel.date.split(" to ");
                    start_date = arr[0];
                    end_date = arr[1] ? arr[1] : arr[0];
                }
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_NOTIFICATIONS_LOCATIONS, {
                        params: {
                            start_date: start_date,
                            end_date: end_date,
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.notifications;
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
            resetModelData() {
                this.selectValue = [];
                this.selectSupervisorsValue = [];
            },
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
