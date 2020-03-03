<template>
    <div>

        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
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
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.created_at}}
                                        </td>
                                        <td>
                                            {{row.mandoob.first_name}}
                                            {{row.mandoob.last_name}}
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
            vm.getAllNotifications();
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
            getAllNotifications() {
                let vm = this;
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
