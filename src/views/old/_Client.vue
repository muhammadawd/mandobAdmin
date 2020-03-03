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
                            <h3 v-if="isLoading" class="text-center">LOADING ... </h3>
                            <div v-if="!isLoading" class="table-responsive">
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
                                        <td class="budget">
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
                                            {{row.status}}
                                        </td>
                                        <td>
                                            {{row.transactionStatus}}
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteClient(row)">
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
                        <label>{{$ml.get('name')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.name">
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('phone')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.phone">
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('mobile')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.mobile">
                    </div>
                    <div class="col-md-4">
                        <label>{{$ml.get('email')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.email">
                    </div>
                    <div class="col-md-5">
                        <label>{{$ml.get('address')}}</label>
                        <input type="text" class="form-control" v-model="dataModel.addressText">
                    </div>
                    <div class="col-md-3">
                        <label>{{$ml.get('city')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.city">
                            <option v-for="(item , key) in governments" :value="item" :key="key">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>{{$ml.get('status')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.status">
                            <option v-for="(item , key) in Client_Types" :value="item" :key="key">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>{{$ml.get('transactionStatus')}}</label>
                        <select type="text" class="form-control" v-model="dataModel.transactionStatus">
                            <option v-for="(item , key) in Trans_type" :value="item" :key="key">{{item}}</option>
                        </select>
                    </div>
                    <div class="col-md-12 text-center mt-2">
                        <button class="btn btn-info" :disabled="disable" @click="addClient()" v-if="!dataModel.id">
                            <slot v-if="disable">LOADING ...</slot>
                            <slot v-if="!disable">{{$ml.get('add')}}</slot>
                        </button>
                        <button class="btn btn-info" :disabled="disable" @click="updateClient()" v-if="dataModel.id">
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

    export default {
        data() {
            return {
                tableData: [],
                isLoading: true,
                Trans_type: ["كبير", "متوسط", "صغير"],
                Client_Types: ["جاري", "محتمل", "قديم"],
                governments: [
                    'الإسكندرية',
                    'الإسماعيلية',
                    'أسوان',
                    'أسيوط',
                    'الأقصر',
                    'البحر الأحمر',
                    'البحيرة',
                    'بني سويف',
                    'بورسعيد',
                    'جنوب سيناء',
                    'الجيزة',
                    'الدقهلية',
                    'دمياط',
                    'سوهاج',
                    'السويس',
                    'الشرقية',
                    'شمال سيناء',
                    'الغربية',
                    'الفيوم',
                    'القاهرة',
                    'القليوبية',
                    'قنا',
                    'كفر الشيخ',
                    'مطروح',
                    'المنوفية',
                    'المنيا',
                    'الوادي الجديد',
                ],
                disable: false,
                dataModel: {
                    addressText: "",
                    city: "",
                    email: "",
                    lastVisitRef_id: "",
                    lat: "",
                    lng: "",
                    mobile: "",
                    name: "",
                    phone: "",
                    shopCreationDate: "",
                    status: "",
                    transactionStatus: ""
                }
            }
        },
        mounted() {
            let vm = this;
            vm.getAllDelegates();
        },
        components: {
            SweetModal,
            SweetModalTab
        },
        methods: {
            showModal() {
                let vm = this;
                vm.resetModelData();
                vm.$refs.addModal.open();
            },
            showUpdateModal(data) {
                let vm = this;
                vm.dataModel = data;
                vm.$refs.addModal.open();
            },
            getAllDelegates() {
                let vm = this;
                vm.$root.$firestore.raw_clients.get().then(function (doc) {
                    if (doc) {
                        doc.docs.forEach((item) => {
                            vm.tableData.push(item.data())
                        });
                        vm.isLoading = false;
                    } else {
                        vm.tableData = [];
                        vm.isLoading = false;
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    vm.tableData = [];
                    vm.isLoading = false;
                    console.log("Error getting document:", error);
                });
            },
            deleteClient: function (person) {
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
                        person = JSON.parse(JSON.stringify(person));
                        // console.log(person.id)
                        vm.$root.$firestore.raw_clients.doc(person.id).delete().then(() => {
                            location.reload()
                        })
                        // location.reload()
                    }
                });
                // this.$root.$firestore.raw_clients.doc(person.id).delete()
            },
            addClient: function () {
                let vm = this;
                let data = vm.dataModel;
                vm.disable = true;
                const ref = vm.$root.$firestore.raw_clients.doc();
                data.id = ref.id;

                ref.set(data)
                    .then(() => {
                        ref.get().then(doc => {
                            vm.disable = false;
                            vm.tableData.push(doc.data())
                            vm.resetModelData();
                            vm.$refs.addModal.close();
                            console.log(doc.data())
                        })
                    })
            },
            updateClient: function () {
                let vm = this;
                let data = vm.dataModel;
                vm.disable = true;
                vm.$root.$firestore.raw_clients.doc(data.id).update(data).then(() => {
                    location.reload()
                })
            },
            resetModelData() {
                this.dataModel = {
                    addressText: "",
                    city: "",
                    email: "",
                    lastVisitRef_id: "",
                    lat: "",
                    lng: "",
                    mobile: "",
                    name: "",
                    phone: "",
                    shopCreationDate: "",
                    status: "",
                    transactionStatus: ""
                }
            }
        }
    }
</script>
<style>
</style>
