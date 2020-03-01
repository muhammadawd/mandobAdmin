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
                                        <label class="font-weight-bold">{{$ml.get('status')}}</label>
                                        <select class="form-control form-control-alternative" v-model="status"
                                                @change="getAllEndCustomers()">
                                            <option value="">All</option>
                                            <option value="completed">Completed</option>
                                            <option value="not_completed">Not Completed</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12 text-center">
                                        <button class="btn btn-primary mt-2" @click="getAllEndCustomers()">
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
                                        <th>{{$ml.get('name')}}</th>
                                        <th>{{$ml.get('address')}}</th>
                                        <th>{{$ml.get('phone')}}</th>
                                        <th>{{$ml.get('warranty_certificate')}}</th>
                                        <th>{{$ml.get('image')}}</th>
                                        <th>{{$ml.get('finished_at')}}</th>
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
                                            <slot v-if="row.finished_at">
                                                <label class="badge badge-primary">{{$ml.get('delivered')}}</label>
                                            </slot>
                                            <slot v-if="!row.finished_at">
                                                <label class="badge badge-danger">{{$ml.get('not_delivered')}}</label>
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
            vm.getAllEndCustomers();
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
            getAllEndCustomers() {
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
                    window.serviceAPI.API().get(window.serviceAPI.ALL_ENDCUSTOMER, {
                        params: {
                            status: vm.status,
                            start_date: start_date,
                            end_date: end_date,
                            mandoob_id: mandoob_id
                        }
                    }).then((response) => {
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
        }
    }
</script>
