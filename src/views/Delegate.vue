<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-md-4 text-right">
                    <button class="btn btn-success btn-icon btn-icon-only">
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
                                        <th>{{$ml.get('firstname')}}</th>
                                        <th>{{$ml.get('lastname')}}</th>
                                        <th>{{$ml.get('email')}}</th>
                                        <th width="100">{{$ml.get('operations')}}</th>
                                    </template>

                                    <template slot-scope="{row}">
                                        <td class="budget">
                                            {{row.firstname}}
                                        </td>
                                        <td>
                                            {{row.lastname}}
                                        </td>
                                        <td>
                                            {{row.email}}
                                        </td>
                                        <td>
                                            <div class="btn-group" dir="ltr">
                                                <button class="btn btn-danger btn-sm" @click="deleteDelegate(row)">
                                                    <i class="ni ni-fat-remove ni-lg pt-1"></i>
                                                </button>
                                                <button class="btn btn-info btn-sm">
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
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            let vm = this;
            vm.getAllDelegates();
        },
        methods: {
            getAllDelegates() {
                let vm = this;
                vm.$root.$firestore.raw_mandoobs.get().then(function (doc) {
                    if (doc) {
                        doc.docs.forEach((item) => {
                            vm.tableData.push(item.data())
                        });
                    } else {
                        vm.tableData = [];
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    vm.tableData = [];
                    console.log("Error getting document:", error);
                });
            },
            deleteDelegate: function (person) {
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
                        vm.$root.$firestore.raw_mandoobs.doc(person.id).delete()
                        // location.reload()
                    }
                });
                // this.$root.$firestore.raw_mandoobs.doc(person.id).delete()
            },
            updatePerson: function (person) {
                this.$root.$firestore.raw_mandoobs.doc(person.id).update({
                    name: "Amrani Houssain",
                    github: "@amranidev"
                })
            }
        }
    }
</script>
<style>
</style>
