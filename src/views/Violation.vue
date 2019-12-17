<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right d-print-none">
                    <button class="btn btn-secondary d-print-none" @click="print()">
                        <i class="fas fa-print"></i>
                    </button>
                    <!--                    <button class="btn btn-info btn-icon btn-icon-only" @click="showModal()">-->
                    <!--                        <i class="ni ni-fat-add ni-lg pt-1"></i>-->
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
                            <div class="row p-2 mt-2 mb-2 d-print-none">
                                <div class="col-md-3 text-right">
                                    <label class="font-weight-bold">{{$ml.get('date')}}</label>
                                    <flat-pickr class="form-control text-center form-control-alternative" dir="ltr"
                                                :config="{dateFormat: 'Y-m-d',mode:'range'}"
                                                v-model="filterModel.date"></flat-pickr>
                                </div>
                                <div class="col-md-12 text-right mt-1">
                                    <button class="btn btn-info btn-md" @click="getAllViolations()">
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
                                        <th>{{$ml.get('name')}}</th>
                                        <th>{{$ml.get('value')}}</th>
                                        <th>{{$ml.get('date')}}</th>
                                        <th>{{$ml.get('notes')}}</th>
                                        <th class="d-print-none" width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.mandoob.first_name}} {{row.mandoob.last_name}}
                                        </td>
                                        <td>
                                            {{row.value}}
                                        </td>
                                        <td>
                                            {{row.date}}
                                        </td>
                                        <td>
                                            {{row.notes}}
                                        </td>

                                        <td class="d-print-none">
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteViolation(row)">
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
                    <div class="col-md-3">
                        <label class="font-weight-bold">{{$ml.get('date')}}</label>
                        <flat-pickr type="text" class="form-control" v-model="dataModel.date"></flat-pickr>
                        <div class="text-danger error_text" id="date_error"></div>
                    </div>
                    <div class="col-md-3">
                        <label class="font-weight-bold">{{$ml.get('value')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.value">
                        <div class="text-danger error_text" id="value_error"></div>
                    </div>
                    <div class="col-md-6">
                        <label class="font-weight-bold">{{$ml.get('notes')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.notes">
                        <div class="text-danger error_text" id="notes_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <!--                        <button class="btn btn-info" @click="addClient()" v-if="!dataModel.id">-->
                        <!--                            <slot v-if="disable">LOADING ...</slot>-->
                        <!--                            <slot v-if="!disable">{{$ml.get('add')}}</slot>-->
                        <!--                        </button>-->
                        <button class="btn btn-info" @click="updateClient()" v-if="dataModel.id">
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
                tableData: [],
                isLoading: true,
                disable: false,
                dataModel: {},
                filterModel: {},
            }
        },
        mounted() {
            let vm = this;
            vm.getAllViolations();
        },
        components: {
            Multiselect,
            SweetModal,
            flatPickr,
            SweetModalTab
        },
        methods: {
            print() {
                window.print()
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
                vm.$refs.addModal.open();
            },
            getAllViolations() {
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
                    window.serviceAPI.API().get(window.serviceAPI.ALL_VIOLATION, {
                        params: {
                            start_date: start_date,
                            end_date: end_date
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.violations.data;
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
            deleteViolation: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_VIOLATION + `/${row.id}`)
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
            updateClient: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_VIOLATION, request_data)
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
                                let violation = response.data.violation;
                                vm.tableData.push(violation);
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
                this.dataModel = {}
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
