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
                    <label class="text-white font-weight-bold">{{$ml.get('person')}}</label>
                    <multiselect v-model="selectValue" :options="allFilterDataAltered" :multiple="false"
                                 group-values="persons" :custom-label="customLabel"
                                 group-label="key" :group-select="false" :placeholder="$ml.get('search')"
                                 track-by="first_name" label="first_name">
                        <span slot="noResult">Oops! No elements found. </span>
                    </multiselect>
                </div>
                <div class="col-md-3">
                    <div class="autocomplete">
                        <label class="text-white font-weight-bold">{{$ml.get('detail')}}</label>
                        <input class="form-control form-control-alternative" @input="getAllExpensesOptions()"
                               v-model="auto_complete_query">
                        <ul class="autocomplete-results" v-if="auto_complete_data.length > 0">
                            <li class="autocomplete-result"
                                v-for="(item , key) in auto_complete_data" :key="key" @click="selectAutoSuggest(item)">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-12 text-center">
                    <button class="btn btn-primary mt-2" @click="getAllExpenses()">
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
                                        <th>{{$ml.get('name')}}</th>
                                        <th>{{$ml.get('type')}}</th>
                                        <th>{{$ml.get('detail')}}</th>
                                        <th>{{$ml.get('cost')}}</th>
                                        <th>{{$ml.get('date')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.name}}
                                        </td>
                                        <td>
                                            {{row.type}}
                                        </td>
                                        <td>
                                            <slot v-if="row.option">
                                                {{row.option.value}}
                                            </slot>
                                        </td>
                                        <td>
                                            {{row.cost}}
                                        </td>
                                        <td>
                                            {{row.date}}
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
                auto_complete_query: null,
                auto_complete_data: [],
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
            vm.getAllExpenses();
            vm.getAllFilterData();
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

                let spender_id = null;
                let type = null;
                if (this.selectValue) {
                    type = this.selectValue.person_type;
                    spender_id = this.selectValue.id;
                }

                return {
                    spender_id: spender_id,
                    type: type,
                    option: this.auto_complete_query,
                    start_date: start_date,
                    end_date: end_date ? end_date : start_date,
                }
            },
            getAllExpenses() {
                let vm = this;
                let request_data = vm.prepareFilter(vm.filterModel);
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.EXPENSES_REPORT, {
                        params: request_data
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.expenses;
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
            getAllExpensesOptions() {
                let vm = this;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_EXPENSES_AUTO_COMPLETE, {
                        params: {
                            query: vm.auto_complete_query
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.auto_complete_data = response.data.options
                                return
                            }
                            vm.auto_complete_data = []

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        vm.auto_complete_data = []
                        window.helper.handleError(error, vm);
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
                                $.each(response.data.mandoob.data, function (index, item) {
                                    item['person_type'] = 'mandoob'
                                });
                                $.each(response.data.supervisor.data, function (index, item) {
                                    item['person_type'] = 'supervisor'
                                });
                                vm.allFilterData = response.data;
                                vm.allFilterDataAltered.push({
                                    key: vm.$ml.get('mandoob'),
                                    persons: response.data.mandoob.data
                                });
                                vm.allFilterDataAltered.push({
                                    key: vm.$ml.get('supervisor'),
                                    persons: response.data.supervisor.data
                                });
                                return null;
                            }
                            vm.allFilterData = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.allFilterData = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            customLabel({first_name, last_name}) {
                return `${first_name} – ${last_name}`
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
