<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <button class="btn btn-secondary" @click="print">
                <i class="fas fa-print"></i>
            </button>
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
                                        <th>{{$ml.get('mobile')}}</th>
                                        <th>{{$ml.get('phone')}}</th>
                                        <th>{{$ml.get('email')}}</th>
                                        <th>{{$ml.get('address')}}</th>
                                        <th>{{$ml.get('status')}}</th>
                                        <th>{{$ml.get('transactionStatus')}}</th>
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

    export default {
        data() {
            return {
                selectValue: null,
                tableData: [],
                isLoading: true,
                disable: false,
            }
        },
        mounted() {
            let vm = this;
            vm.getAllClients();
        },
        methods: {
            print(){
                this.$htmlToPaper('printMe')
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
                                vm.tableData = response.data.clients;
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
            }
        }
    }
</script>
