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
                                <datatable class="table direction" :columns="columns" :data="rows"></datatable>
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
    import Vue from 'vue';
    import {VuejsDatatableFactory} from 'vuejs-datatable';

    Vue.use(VuejsDatatableFactory);

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';


    // {{$ml.get('code')}}
    // {{$ml.get('value')}}
    // {{$ml.get('status')}}
    // {{$ml.get('delivered_at')}}
    // {{$ml.get('finished_at')}}
    // {{$ml.get('created_at')}}
    export default {
        data() {
            return {
                selectValue: null,
                type: "",
                value: null,
                service_url: window.serviceAPI.BASE_URL + window.serviceAPI.PERSONS_REPORT,
                all_coupon_values: [],
                tableData: [],
                isLoading: true,
                disable: false,
                dataModel: {},

                columns: [
                    {label: this.$ml.get('barcode'), field: 'barcode', headerClass: 'text-right'},
                    {label: this.$ml.get('name'), field: 'name', headerClass: 'text-right'},
                    {label: this.$ml.get('type'), field: 'type', headerClass: 'text-right'},
                ],
                rows: []
            }
        },
        mounted() {
            let vm = this;
            vm.getAllPersons();
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
            getAllPersons() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.PERSONS_REPORT, {
                        params: {
                            // type: vm.type
                        }
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                console.log(response.data)
                                vm.rows = response.data.persons;
                                return null;
                            }
                            vm.rows = [];

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                        vm.rows = [];
                    });
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
<style>
    td {
        text-align: right !important;
    }
</style>
