<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-success btn-icon btn-icon-only" @click="showModal()">
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
                                        <th>{{$ml.get('first_name')}}</th>
                                        <th>{{$ml.get('last_name')}}</th>
                                        <th>{{$ml.get('email')}}</th>
                                        <th>{{$ml.get('type')}}</th>
                                        <th>{{$ml.get('cities')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.first_name}}
                                        </td>
                                        <td>
                                            {{row.last_name}}
                                        </td>
                                        <td>
                                            {{row.email}}
                                        </td>
                                        <td>
                                            {{row.type}}
                                        </td>
                                        <td v-html="getCitiesText(row.cities)"></td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteMandoob(row)">
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
                        <label>{{$ml.get('first_name')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.first_name">
                        <div class="text-danger error_text" id="first_name_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('last_name')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.last_name">
                        <div class="text-danger error_text" id="last_name_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('email')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.email">
                        <div class="text-danger error_text" id="email_error"></div>
                    </div>
                    <div class="col-md-12"></div>
                    <div class="col-md-4">
                        <label>{{$ml.get('supervisor')}}</label>
                        <select class="form-control" v-model="dataModel.parent_id">
                            <option v-for="(item , key) in allSupervisors" :value="item.id">{{item.first_name}}
                                {{item.last_name}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="supervisor_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('type')}}</label>
                        <select class="form-control" v-model="dataModel.type">
                            <option value="normal">Normal</option>
                            <option value="super">Super</option>
                        </select>
                        <div class="text-danger error_text" id="type_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('password')}}</label>
                        <input type="password" class="form-control" v-model="dataModel.password">
                        <div class="text-danger error_text" id="password_error"></div>
                    </div>
                    <div class="col-md-12">
                        <label>{{$ml.get('city')}}</label>
                        <multiselect v-model="selectValue" :options="allGovernorates" :multiple="true"
                                     group-values="cities"
                                     group-label="name" :group-select="false" :placeholder="$ml.get('search')"
                                     track-by="name" label="name">
                            <span slot="noResult">Oops! No elements found.</span>
                        </multiselect>
                        <div class="text-danger error_text" id="city_id_error"></div>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addMandoob()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
                        <button class="btn btn-info" @click="updateMandoob()" v-if="dataModel.id">
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

    export default {
        data() {
            return {
                selectValue: [],
                tableData: [],
                allSupervisors: [],
                isLoading: true,
                disable: false,
                allGovernorates: [],
                statusModel: {
                    client_status: [],
                    client_transaction: [],
                },
                dataModel: {}
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
            vm.getAllSupervisor();
            vm.getAllMandoob();
            vm.getallGovernorates();
            // vm.getAllStatus();
        },
        components: {
            Multiselect,
            SweetModal,
            SweetModalTab
        },
        methods: {
            getCitiesText(cities) {
                let str = '';
                _.forEach(cities, (item, index) => {
                    str += `<span class="badge badge-info" style="font-size: 12px"> ${item.translated.title} </span> `;
                    // if (index + 1 != cities.length) str += ','
                })
                return str;
            },
            showModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.addModal.open();
            },
            showUpdateModal(data) {
                let vm = this;
                vm.dataModel = data;
                vm.selectValue = data.cities;
                vm.$refs.addModal.open();
            },
            getAllStatus() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_STATUS, {params: {typess: JSON.stringify(['client_status', 'client_transaction'])}})
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.statusModel.client_status = response.data.status.client_status;
                                vm.statusModel.client_transaction = response.data.status.client_transaction;
                            }
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.statusModel.client_status = [];
                        vm.statusModel.client_transaction = [];
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
            getAllSupervisor() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_SUPERVISOR)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.allSupervisors = response.data.super_visors;
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
                                vm.tableData = response.data.mandoobs;
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
            deleteMandoob: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_MANDOOBS+ `/${row.id}`)
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
            addMandoob: function () {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.city_ids = _.map(vm.selectValue, 'id');
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_MANDOOBS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let mandoob = response.data.mandoob;
                                vm.tableData.push(mandoob);
                                vm.$refs.addModal.close();
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            updateMandoob: function () {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.city_ids = _.map(vm.selectValue, 'id');
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_MANDOOBS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                let mandoobs = response.data.mandoob;
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                vm.$refs.addModal.close();
                                // location.reload()
                                $(`#td_row_${request_data.id}`).parent().remove();
                                vm.tableData.push(mandoobs);
                                return null;
                            }

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            resetModelData() {
                this.selectValue = [];
                this.dataModel = {
                    "id": "",
                    "first_name": "",
                    "last_name": "",
                    "email": "",
                    "type": "super_visor",
                    "parent_id": "",
                    "created_at": "",
                    "updated_at": "",
                    "cities": []
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
        background: #182029 !important;
        color: #ffffff !important;
        font-weight: bold;
        font-size: 18px;
    }
</style>
