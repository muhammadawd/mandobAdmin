<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-info btn-icon btn-icon-only" @click="showModal()">
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
                                        <th>{{$ml.get('name')}}</th>
                                        <th>{{$ml.get('mobile')}}</th>
                                        <th>{{$ml.get('phone')}}</th>
                                        <th>{{$ml.get('email')}}</th>
                                        <th>{{$ml.get('address')}}</th>
                                        <th>{{$ml.get('status')}}</th>
                                        <th>{{$ml.get('transactionStatus')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget" :id="'td_row_'+row.id">
                                            {{row.name}}
                                        </td>
                                        <td>
                                            {{row.mobile}}
                                        </td>
                                        <td>
                                            {{row.phone}}
                                        </td>
                                        <td>
                                            {{row.email}}
                                        </td>
                                        <td>
                                            {{row.addressText}}
                                        </td>
                                        <td>
                                            <slot v-if="row.status">
                                                {{row.status.translated.title}}
                                            </slot>
                                        </td>
                                        <td>
                                            <slot v-if="row.transaction_status">
                                                {{row.transaction_status.translated.title}}
                                            </slot>
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteClient(row)">
                                                    <i class="ni ni-fat-remove ni-lg pt-1"></i>
                                                </button>
                                                <router-link
                                                        :to="{name:'show_client',params:{id:row.id}}"
                                                        class="btn btn-sm btn-warning">
                                                    <i class="fa fa-eye pt-1"></i>
                                                </router-link>
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
                        <label>{{$ml.get('name')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.name">
                        <div class="text-danger error_text" id="name_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('phone')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.phone">
                        <div class="text-danger error_text" id="phone_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('mobile')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.mobile">
                        <div class="text-danger error_text" id="mobile_error"></div>
                    </div>
                    <div class="col-md-12"></div>
                    <div class="col-md-4">
                        <label>{{$ml.get('city')}}</label>
                        <multiselect v-model="selectValue" :options="allGovernorates" :multiple="false"
                                     group-values="cities"
                                     group-label="name" :group-select="false" :placeholder="$ml.get('search')"
                                     track-by="name" label="name">
                            <span slot="noResult">Oops! No elements found. </span>
                        </multiselect>

                        <!--                        <select type="text" class="form-control" v-model="dataModel.city_id">-->
                        <!--                            <option v-for="(item , key) in allGovernorates" :value="item.id" :key="key">-->
                        <!--                                {{item.translated.title}}-->
                        <!--                            </option>-->
                        <!--                        </select>-->
                        <div class="text-danger error_text" id="city_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('status')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.status_id">
                            <option v-for="(item , key) in statusModel.client_status" :value="item.id" :key="key">
                                {{item.translated.title}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="status_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('transactionStatus')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.transaction_status_id">
                            <option v-for="(item , key) in statusModel.client_transaction" :value="item.id" :key="key">
                                {{item.translated.title}}
                            </option>
                        </select>
                        <div class="text-danger error_text" id="transaction_status_id_error"></div>
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('email')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.email">
                        <div class="text-danger error_text" id="email_error"></div>
                    </div>
                    <div class="col-md-8">
                        <label>{{$ml.get('address')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.addressText">
                        <div class="text-danger error_text" id="addressText_error"></div>
                    </div>
                    <div class="col-md-12">
                        <label>{{$ml.get('address')}}</label>

                        <gmap-map ref="mymap" :center="mapStartLocation" :zoom="7" style="width: 100%; height: 300px" :draggable="true">
                            <gmap-marker :position="mapStartLocation" :draggable="true" @drag="updateCoordinates" />
<!--                            <gmap-marker :position="mapStartLocation"/>-->
                        </gmap-map>
<!--                        <GmapMap-->
<!--                                :center="{lat:10, lng:10}"-->
<!--                                :zoom="7"-->
<!--                                map-type-id="terrain"-->
<!--                                style="width:100%; height: 300px"-->
<!--                        >-->
<!--                            <GmapMarker-->
<!--                                    :key="index"-->
<!--                                    v-for="(m, index) in markers"-->
<!--                                    :position="m.position"-->
<!--                                    :clickable="true"-->
<!--                                    :draggable="true"-->
<!--                                    @click="center=m.position"-->
<!--                            />-->
<!--                        </GmapMap>-->
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" @click="addClient()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
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
    import Vue from 'vue'
    import * as VueGoogleMaps from 'vue2-google-maps'

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCqIzCMjzn64-AcsHMKgkPXEZcKc1sTuGs',
            libraries: 'places',
        },
    })
    import {gmapApi} from 'vue2-google-maps'

    export default {
        data() {
            return {
                coordinates: {
                    lat:28.519383,
                    lng:29.768600,
                },
                mapStartLocation:{
                    lat:28.519383,
                    lng:29.768600,
                },
                selectValue: null,
                tableData: [],
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
        computed: {
            google: gmapApi
        },
        watch: {
            selectValue: function (newVal, oldVal) {
                if (newVal) {
                    this.dataModel.city_id = newVal.id
                } else {
                    this.dataModel.city_id = newVal
                }
            },
        },
        mounted() {
            let vm = this;
            vm.getAllClients();
            vm.getallGovernorates();
            vm.getAllStatus();
        },
        components: {
            Multiselect,
            SweetModal,
            SweetModalTab
        },
        methods: {
            updateCoordinates(location) {
                // console.log(this.$refs.mymap)
                this.coordinates = {
                    lat: location.latLng.lat(),
                    lng: location.latLng.lng(),
                };
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
                console.log(data.lat  , data.lng)
                vm.coordinates = {
                    lat:data.lat,
                    lng:data.lng,
                };
                vm.mapStartLocation = {
                    lat:data.lat,
                    lng:data.lng,
                };
                vm.$refs.addModal.open();
            },
            getAllStatus() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_STATUS)
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
            getAllClients() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_CLIENTS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.clients.data;
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
            deleteClient: function (row) {
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
                            window.serviceAPI.API().post(window.serviceAPI.DELETE_CLIENTS + `/${row.id}`)
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
            addClient: function () {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.lat = vm.coordinates.lat;
                request_data.lng = vm.coordinates.lng;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_CLIENTS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let client = response.data.client;
                                vm.tableData.push(client);
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
            updateClient: function () {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.lat = vm.coordinates.lat;
                request_data.lng = vm.coordinates.lng;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_CLIENTS, request_data)
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
                                let client = response.data.client;
                                vm.tableData.push(client);
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
                this.dataModel = {
                    "id": '',
                    "addressText": '',
                    "email": '',
                    "lat": '',
                    "lng": '',
                    "mobile": '',
                    "name": '',
                    "phone": '',
                    "city_id": '',
                    "status_id": '',
                    "transaction_status_id": '',
                    "shopCreationDate": '',
                    "created_at": '',
                    "updated_at": '',
                    "city": {
                        "id": '',
                        "title_ar": '',
                        "title_en": '',
                        "created_at": '',
                        "updated_at": '',
                        "translated": {
                            "title": '',
                        }
                    },
                    "status": {
                        "id": '',
                        "title_ar": '',
                        "title_en": '',
                        "type": '',
                        "created_at": '',
                        "updated_at": '',
                        "translated": {
                            "title": '',
                        }
                    },
                    "transaction_status": {
                        "id": '',
                        "title_ar": '',
                        "title_en": '',
                        "type": '',
                        "created_at": '',
                        "updated_at": '',
                        "translated": {
                            "title": '',
                        }
                    }
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
</style>
