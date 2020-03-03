<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right"></div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <table class="table table-bordered" v-if="dataModel">
                                <tr>
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('name')}}</td>
                                    <td>{{dataModel.name}}</td>
                                </tr>
                                <tr>
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('phone')}}</td>
                                    <td>{{dataModel.phone}}</td>
                                </tr>
                                <tr>
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('mobile')}}</td>
                                    <td>{{dataModel.mobile}}</td>
                                </tr>
                                <tr>
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('email')}}</td>
                                    <td>{{dataModel.email}}</td>
                                </tr>
                                <tr>
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('address')}}</td>
                                    <td>{{dataModel.addressText}}</td>
                                </tr>
                                <tr v-if="dataModel.status">
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('status')}}</td>
                                    <td>{{dataModel.status.translated.title}}</td>
                                </tr>
                                <tr v-if="dataModel.transaction_status">
                                    <td width="200" class="bg-warning text-white font-weight-bold">{{$ml.get('transactionStatus')}}</td>
                                    <td>{{dataModel.transaction_status.translated.title}}</td>
                                </tr>
                            </table>
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

    export default {
        data() {
            return {
                isLoading: true,
                disable: false,
                dataModel: null
            }
        },
        mounted() {
            let vm = this;
            let id = vm.$route.params.id;
            vm.getClient(id);
        },
        components: {
            Multiselect,
            SweetModal,
            SweetModalTab
        },
        methods: {
            getClient(id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.FIND_CLIENTS + `/${id}`)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.dataModel = response.data.client;
                                return null;
                            }
                            vm.dataModel = null;
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.dataModel = null;
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
