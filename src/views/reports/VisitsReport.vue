<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <button class="btn btn-secondary" @click="print">
                <i class="fas fa-print"></i>
            </button>
            <div class="row text-right" dir="rtl">
                <div class="col-md-3">
                    <label class="text-white font-weight-bold">{{$ml.get('date')}}</label>
                    <flat-pickr class="form-control form-control-alternative"
                                :config="{wrap: true,altInput: true,dateFormat: 'Y-m-d',mode:'range'}"
                                v-model="filterModel.date"></flat-pickr>
                </div>
                <div class="col-md-3">
                    <label class="text-white font-weight-bold">{{$ml.get('clients')}}</label>
                    <multiselect v-model="selectClient" :options="clients" label="name" track-by="name"
                                 :placeholder="$ml.get('search')"></multiselect>

                </div>
                <div class="col-md-3">
                    <label class="text-white font-weight-bold">{{$ml.get('mandoob')}}</label>
                    <multiselect v-model="selectMandoob" :options="mandoobs" label="name" track-by="name"
                                 :custom-label="nameFirstlast"
                                 :placeholder="$ml.get('search')"></multiselect>

                </div>
                <div class="col-md-3">
                    <label class="text-white font-weight-bold">{{$ml.get('supervisor')}}</label>
                    <multiselect v-model="selectSupervisor" :options="supervisor" label="name" track-by="name"
                                 :custom-label="nameFirstlast"
                                 :placeholder="$ml.get('search')"></multiselect>

                </div>
                <div class="col-md-3">
                    <label class="font-weight-bold text-white">{{$ml.get('status')}}</label>
                    <select v-model="status" class="form-control form-control-alternative">
                        <option value="completed">completed</option>
                        <option value="not_completed">not_completed</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="font-weight-bold text-white">{{$ml.get('city')}}</label>
                    <multiselect v-model="selectedGov" :options="allGovernorates" :multiple="false"
                                 group-values="cities"
                                 group-label="name" :group-select="false" :placeholder="$ml.get('search')"
                                 track-by="name" label="name">
                        <span slot="noResult">Oops! No elements found. </span>
                    </multiselect>
                    <div class="text-danger error_text" id="city_id_error"></div>
                </div>
                <div class="col-md-12 text-center">
                    <button class="btn btn-primary mt-2" @click="getAllVisits()">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col">
                    <div class="card shadow border-0" id="printMe">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="table-responsive">
                                <base-table class="table align-items-center table-flush"
                                            :class="'table-darks'"
                                            :thead-classes="'thead-darks'"
                                            tbody-classes="list"
                                            :data="tableData">
                                    <template slot="columns">
                                        <th>{{$ml.get('mandoob')}}</th>
                                        <th>{{$ml.get('clients')}}</th>
                                        <th>{{$ml.get('type')}}</th>
                                        <th>{{$ml.get('status')}}</th>
                                        <th>{{$ml.get('cost')}}</th>
                                        <th>{{$ml.get('start_date')}}</th>
                                        <th>{{$ml.get('end_date')}}</th>
                                        <th>{{$ml.get('notes')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            <slot v-if="row.mandoob">
                                                {{row.mandoob.first_name}} {{row.mandoob.last_name}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.client">
                                                {{row.client.name}}
                                            </slot>
                                        </td>
                                        <td>
                                            {{row.type}}
                                        </td>
                                        <td>
                                            <span class="badge badge-dark">
                                                {{row.status}}
                                            </span>
                                        </td>
                                        <td>
                                            {{row.cost}}
                                        </td>
                                        <td>
                                            {{row.start_date}}
                                        </td>
                                        <td>
                                            {{row.end_date}}
                                        </td>
                                        <td>
                                            {{row.notes}}
                                        </td>
                                    </template>
                                </base-table>
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
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        data() {
            return {

                allGovernorates: [],
                selectedGov: null,
                selectValue: null,
                selectSupervisor: null,
                selectMandoob: null,
                selectClient: null,
                status: null,
                supervisor: [],
                mandoobs: [],
                clients: [],
                tableData: [],
                allFilterData: [],
                allFilterDataAltered: [],
                isLoading: true,
                disable: false,
                filterModel: {
                    date: null
                }
            }
        },
        mounted() {
            let vm = this;
            vm.getAllVisits();
            vm.getAllFilterData();
            vm.getallGovernorates();
        },
        components: {
            Multiselect,
            flatPickr
        },
        methods: {
            print() {
                this.$htmlToPaper('printMe')
            },
            selectAutoSuggest(item) {
                let vm = this;
                vm.auto_complete_query = item
                vm.auto_complete_data = []
            },
            prepareFilter(model) {

                let date = model.date;
                let start_date = null;
                let end_date = null;

                if (date) {
                    let arr = date.split(" to ");
                    start_date = arr[0];
                    end_date = arr[1];
                }

                let client_id = null;
                if (this.selectClient) {
                    client_id = this.selectClient.id;
                }
                let supervisor_id = null;
                if (this.selectSupervisor) {
                    supervisor_id = this.selectSupervisor.id;
                }
                let mandoob_id = null;
                if (this.selectMandoob) {
                    mandoob_id = this.selectMandoob.id;
                }
                let governorate_id = null;
                if (this.selectedGov) {
                    governorate_id = this.selectedGov.id;
                }

                return {
                    mandoob_id: mandoob_id,
                    supervisor_id: supervisor_id,
                    client_id: client_id,
                    city_id: governorate_id,
                    status: this.status,
                    start_date: start_date,
                    end_date: end_date ? end_date : start_date,
                }
            },
            getAllVisits() {
                let vm = this;
                let request_data = vm.prepareFilter(vm.filterModel);
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.VISITS_REPORT, {
                        params: request_data
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.visit_details;
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
            getAllFilterData() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_SITE_DATA)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.mandoobs = response.data.mandoob.data
                                vm.supervisor = response.data.supervisor.data
                                vm.clients = response.data.clients.data
                                return null;
                            }
                            vm.supervisor = [];
                            vm.mandoobs = [];
                            vm.clients = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.supervisor = [];
                        vm.mandoobs = [];
                        vm.clients = [];
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
            nameFirstlast({first_name, last_name}) {
                return `${first_name} - ${last_name}`
            }
        }
    }
</script>
<style>
    .autocomplete {
        position: relative;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        background: #fff;
        border: 1px solid #eeeeee;
        max-height: 120px;
        overflow: auto;
        position: absolute;
        width: 100%;
        z-index: 99;
        box-shadow: 1px 2px 10px #ccc;
    }

    .autocomplete-result {
        list-style: none;
        text-align: right;
        padding: 4px 2px;
        cursor: pointer;
    }

    .autocomplete-result:hover {
        background-color: #4AAE9B;
        color: white;
    }
</style>
