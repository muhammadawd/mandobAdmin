<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <button class="btn btn-secondary" @click="print">
                <i class="fas fa-print"></i>
            </button>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0" id="printMe">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="table-responsive">
                                <div class="row p-2">
                                    <div class="col-md-3 text-right">
                                        <label class="font-weight-bold">{{$ml.get('date')}}</label>
                                        <flat-pickr class="form-control form-control-alternative"
                                                    :config="{wrap: true,altInput: true,dateFormat: 'Y-m-d',mode:'range'}"
                                                    v-model="filterModel.date"></flat-pickr>
                                    </div>
                                    <div class="col-md-3 text-right">
                                        <label class=" font-weight-bold">{{$ml.get('mandoob')}}</label>
                                        <multiselect v-model="selectMandoob" :options="mandoobs" label="name"
                                                     track-by="name"
                                                     :custom-label="nameFirstlast"
                                                     :placeholder="$ml.get('search')"></multiselect>

                                    </div>
                                    <div class="col-md-3 text-right">
                                        <label class="font-weight-bold">{{$ml.get('status')}}</label>
                                        <select class="form-control form-control-alternative" v-model="status"
                                                @change="getAllCoupons()">
                                            <option value="">All</option>
                                            <option value="completed">Completed</option>
                                            <option value="not_completed">Not Completed</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <button class="btn btn-primary mt-2" @click="getAllCoupons()">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <base-table class="table align-items-center table-flush"
                                            :class="'table-darks'"
                                            :thead-classes="'thead-darks'"
                                            tbody-classes="list"
                                            :data="tableData">
                                    <template slot="columns">
                                        <th>{{$ml.get('value')}}</th>
                                        <th class="text-center">{{$ml.get('status')}}</th>
                                        <th>{{$ml.get('delivered_at')}}</th>
                                        <th>{{$ml.get('finished_at')}}</th>
                                        <th>{{$ml.get('created_at')}}</th>
                                        <th>{{$ml.get('customers')}}</th>
                                        <th>{{$ml.get('mandoob')}}</th>
                                        <th>{{$ml.get('clients')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.value}}
                                        </td>
                                        <td class="text-center" v-html="getStatusTag(row)"></td>
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
                selectValue: null,
                status: "",
                value: null,
                all_coupon_values: [],
                tableData: [],
                mandoobs: [],
                selectMandoob: null,
                isLoading: true,
                disable: false,
                dataModel: {},
                filterModel: {},
            }
        },
        mounted() {
            let vm = this;
            vm.getAllFilterData();
            vm.getAllCoupons();
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
            print() {
                this.$htmlToPaper('printMe')
            },
            getStatusTag(row) {
                if (row.finished_at) {
                    return `<label class="badge badge-success">تم الاستخدام</label>`
                } else if (row.delivered_at) {
                    return `<label class="badge badge-warning">تم التوصيل</label>`
                } else {
                    return `<label class="badge badge-info">جديد</label>`
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
                                // vm.supervisor = response.data.supervisor.data
                                // vm.clients = response.data.clients.data
                                return null;
                            }
                            vm.mandoobs = [];
                            // vm.supervisor = [];
                            // vm.clients = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.mandoobs = [];
                        // vm.supervisor = [];
                        // vm.clients = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            getAllCoupons() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let mandoob_id = this.selectMandoob ? this.selectMandoob.id : null;
                let date = vm.filterModel.date;
                let start_date = null;
                let end_date = null;

                if (date) {
                    let arr = date.split(" to ");
                    start_date = arr[0];
                    end_date = arr[1];
                }
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COUPONS_REPORT, {
                        params: {
                            status: vm.status,
                            start_date: start_date,
                            end_date: end_date,
                            mandoob_id: mandoob_id
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.coupons;
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
            }
        }
    }
</script>
