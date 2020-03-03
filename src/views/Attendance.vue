<template>
    <div>

        <base-header type="gradient-default" class="pb-6 pb-8 pt-5 pt-md-8">
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
                            <div class="row">
                                <div class="col-md-12 text-center mt-3">
                                    <h1 class="font-weight-bold ">{{$ml.get('take_attendance')}}</h1>
                                </div>
                                <div class="col-md-12 mt-5 text-center">

                                        <img src="/img/theme/Marketing-icon-dude-smartphone-checkmark.svg"
                                             class="h-25 mb-3 img-fluid" alt="">
<!--                                    <form @submit.prevent="addAttend()">-->
                                        <input type="text" class="form-control form-control-alternative bg-gray text-white m-auto w-50"
                                               v-model="dataModel.barcode" autofocus :placeholder="$ml.get('barcode')">
                                        <div class="text-danger text-center error_text" id="barcode_error"></div>
                                        <button class="btn btn-primary mt-3" @click="addAttend()">
                                            {{$ml.get('add')}}
                                        </button>
<!--                                    </form>-->
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
                value: null,
                isLoading: true,
                disable: false,
                dataModel: {}
            }
        },
        mounted() {
            let vm = this;
        },
        components: {
            Multiselect,
            flatPickr,
            SweetModal,
            SweetModalTab
        },
        methods: {
            addAttend: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_ATTEND, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
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
                this.dataModel = {
                    barcode: "",
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
