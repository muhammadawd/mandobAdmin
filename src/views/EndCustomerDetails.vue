<template>
    <div>

        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="row">
                                <div class="col-md-12 m-2 text-right">
                                    <button class="btn btn-info btn-sm" @click="addDetail()">
                                        <i class="ni ni-fat-add"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="row p-2 text-right" v-for="(item , key) in dataModel" :key="key">
                                <div class="col-md-4">
                                    <ul class="list-unstyled p-0">
                                        <li class="list-inline-item p-2">
                                            <button class="btn  btn-danger btn-sm m" @click="deleteDetail(key)">
                                                <i class="ni ni-fat-remove"></i>
                                            </button>
                                        </li>
                                        <li class="list-inline-item w-75">
                                            <label>{{$ml.get('name')}}</label>
                                            <input type="text" class="form-control" v-model="dataModel[key].name">
                                        </li>
                                    </ul>
                                    <div class="text-danger error_text" :id="`details.${key}.name_error`"></div>
                                </div>
                                <div class="col-md-2">
                                    <label>{{$ml.get('number')}}</label>
                                    <input type="text" class="form-control" v-model="dataModel[key].number">
                                    <div class="text-danger error_text" :id="`details.${key}.number_error`"></div>
                                </div>
                                <div class="col-md-12"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 text-center mt-2">
                                    <button class="btn btn-info" @click="updateDetailsAPI()">
                                        <slot v-if="disable">LOADING ...</slot>
                                        <slot v-if="!disable">{{$ml.get('edit')}}</slot>
                                    </button>
                                </div>
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
                isLoading: true,
                disable: false,
                dataModel: []
            }
        },
        mounted() {
            let vm = this;
            vm.findEndCustomers();
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
            deleteDetail(key) {
                this.dataModel.splice(key, 1);
            },
            addDetail(key) {
                this.dataModel.push({
                    id: '',
                    name: '',
                    number: '',
                });
            },
            findEndCustomers() {
                let vm = this;
                let id = vm.$route.params.id;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.FIND_ENDCUSTOMER + `/${id}`)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.dataModel = response.data.endCustomer.details;
                                return null;
                            }

                            vm.dataModel = [];
                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.dataModel = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            },
            updateDetailsAPI: function () {
                let vm = this;
                $('.error_text').text('');
                let request_data = {
                    id: vm.$route.params.id,
                    details: JSON.parse(JSON.stringify(vm.dataModel))
                };
                // console.log(JSON.parse(JSON.stringify(request_data)))
                // return
                try {
                    window.serviceAPI.API().post(window.serviceAPI.UPDATE_DETAILS_ENDCUSTOMER, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.$router.push({name: 'end_customer'})
                                $('.error_text').text('');
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
                this.selectValue = null;
                this.dataModel = []
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
