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
                                        <label class="font-weight-bold">{{$ml.get('status')}}</label>
                                        <select class="form-control form-control-alternative" v-model="status" @change="getAllCoupons()">
                                            <option value="">All</option>
                                            <option value="completed">Completed</option>
                                            <option value="not_completed">Not Completed</option>
                                        </select>
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
                isLoading: true,
                disable: false,
                dataModel: {}
            }
        },
        mounted() {
            let vm = this;
            vm.getAllCoupons();
        },
        components: {
            Multiselect,
            flatPickr,
            SweetModal,
            SweetModalTab
        },
        methods: {
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
            getAllCoupons() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COUPONS_REPORT, {
                        params: {
                            status: vm.status
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
