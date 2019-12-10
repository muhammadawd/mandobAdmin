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
            addCoupon: function () {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.ADD_COUPONS, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                vm.resetModelData();
                                $('.error_text').text('');
                                let coupon = response.data.coupon;
                                vm.tableData.push(coupon);
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
            resetModelData() {
                this.selectValue = null;
                this.dataModel = {
                    code: "",
                    coupon_value_id: "",
                    created_at: "",
                    delivered_at: "",
                    finished_at: "",
                    id: "",
                    updated_at: "",
                    value: "",
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
