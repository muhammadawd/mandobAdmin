<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row d-nones">
                <div class="col-xl-3 col-lg-6 text-center">
                    <stats-card :title="$ml.get('totalCollected')"
                                type="gradient-default"
                                :sub-title="totalCollected"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0">
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6 text-center">
                    <stats-card :title="$ml.get('totalVisits')"
                                type="gradient-info"
                                :sub-title="totalVisits"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0">
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6 text-center">
                    <stats-card :title="$ml.get('totalCompletedCoupons')"
                                type="gradient-default"
                                :sub-title="totalCompletedCoupons"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0">
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6 text-center">
                    <stats-card :title="$ml.get('totalNotCompletedCoupons')"
                                type="gradient-info"
                                :sub-title="totalNotCompletedCoupons"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6 mt-2 text-center">
                    <stats-card :title="$ml.get('totalExpenses')"
                                type="gradient-info"
                                :sub-title="totalExpenses"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="row">
                                <div class="col-md-3">
                                    <router-link :to="{name:'expenses_report'}">
                                        <div class="card-item">
                                            <i class="ni ni-money-coins f-lg"></i>
                                            <h2>{{$ml.get('mandoob_expenses_report')}}</h2>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="col-md-3">
                                    <router-link :to="{name:'visits_report'}">
                                        <div class="card-item">
                                            <i class="ni ni-collection  f-lg"></i>
                                            <h2>{{$ml.get('mandoob_visits_report')}}</h2>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="col-md-3">
                                    <router-link :to="{name:'client_report'}">
                                        <div class="card-item">
                                            <i class="ni ni-circle-08 f-lg"></i>
                                            <h2>{{$ml.get('mandoob_clients_report')}}</h2>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="col-md-3">
                                    <router-link :to="{name:'coupons_report'}">
                                        <div class="card-item">
                                            <i class="ni ni-badge f-lg"></i>
                                            <h2>{{$ml.get('mandoob_coupons_report')}}</h2>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="col-md-3">
                                    <router-link :to="{name:'attendance_report'}">
                                        <div class="card-item">
                                            <i class="ni ni-key-25 f-lg"></i>
                                            <h2>{{$ml.get('attendance_report')}}</h2>
                                        </div>
                                    </router-link>
                                </div>
                                <div class="col-md-3"></div>
                                <div class="col-md-3">
                                    <h2 class="font-weight-bold text-center mt-4">{{$ml.get('most_visit_cities')}}</h2>
                                    <donut-chart
                                            id="donut"
                                            :data="donutDataCities"
                                            colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
                                            resize="true">
                                    </donut-chart>
                                </div>
                                <div class="col-md-3">
                                    <h2 class="font-weight-bold text-center mt-4">
                                        {{$ml.get('topMandoobsCollected')}}</h2>
                                    <donut-chart
                                            id="donut2"
                                            :data="donutDataMandoob"
                                            colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
                                            resize="true">
                                    </donut-chart>
                                </div>
                                <div class="col-md-12">

                                    <h2 class="font-weight-bold text-center mt-4">
                                        {{$ml.get('topClientCities')}}</h2>
                                    <bar-chart
                                            id="bar"
                                            :data="barTopClientCities"
                                            grid="true"
                                            xkey="name"
                                            ykeys='["visit_cost"]'
                                            :labels='topClientNames'
                                            grid-text-weight="bold"
                                            bar-colors='[ "#36A2EB", "#FF6384", "#FFCE56" ]'
                                            resize="true">
                                    </bar-chart>
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

    import Raphael from 'raphael/raphael'

    global.Raphael = Raphael

    import {DonutChart, BarChart} from 'vue-morris'

    export default {
        data() {
            return {
                topCities: [],
                topMandoobsCollected: [],
                topClientCities: [],
                topClientNames: [],
                totalVisits: "...",
                totalCollected: "...",
                totalCompletedCoupons: "...",
                totalNotCompletedCoupons: "...",
                totalExpenses: "...",
                donutDataCities: [],
                donutDataMandoob: [],
                barTopClientCities: [],
            }
        },
        mounted() {
            this.getAllStatistics();
            var thisDate,thisData;
            $( "#bar svg" ).on('click', function() {
                // Find data and date in the actual morris diply below the graph.
                thisDate = $(".morris-hover-row-label").html();
                let thisDataHtml = $(".morris-hover-point").html().split(":");
                thisData = thisDataHtml[1].trim();
                console.log(thisDataHtml)

                // alert !!
                console.log( "Data: "+thisData+"\nDate: "+thisDate );
            });
        },
        components: {
            DonutChart,
            BarChart
        },
        methods: {

            prepareTopCities() {
                let vm = this;
                _.forEach(vm.topCities, function (value, key) {
                    vm.donutDataCities.push(
                        {label: value.name, value: value.statistics_count}
                    )
                });
            },
            prepareTopMandoob() {
                let vm = this;
                _.forEach(vm.topMandoobsCollected, function (value, key) {
                    vm.donutDataMandoob.push(
                        {label: value.first_name + ' ' + value.last_name, value: value.collected}
                    )
                });
            },
            prepareTopClientCities() {
                let vm = this;
                _.forEach(vm.topClientCities, function (value, key) {
                    vm.barTopClientCities.push(
                        {
                            label: value.name,
                            name: value.name,
                            id: value.clients[0].id,
                            visit_cost: value.clients[0].visit_cost
                        }
                    );
                    vm.topClientNames.push(value.clients[0].name)
                });
            },
            getAllStatistics() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.COMMON_STATISTICS)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.topCities = response.data.topCities;
                                vm.topClientCities = response.data.topClientCities;
                                vm.topMandoobsCollected = response.data.topMandoobsCollected;
                                vm.totalVisits = response.data.totalVisits.toString();
                                vm.totalCompletedCoupons = response.data.totalCompletedCoupons.toString();
                                vm.totalNotCompletedCoupons = response.data.totalNotCompletedCoupons.toString();
                                vm.totalCollected = response.data.totalCollected.toString();
                                vm.totalExpenses = response.data.totalExpenses.toString();
                                vm.prepareTopCities();
                                vm.prepareTopMandoob();
                                vm.prepareTopClientCities();
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
        }
    }
</script>
<style>
    .card-item {
        background: #fff;
        text-align: center;
        padding-top: 50px;
        padding-bottom: 50px;
        margin-top: 10px;
        /*margin-left: -10px;*/
        /*margin-right: -10px;*/
        box-shadow: 1px 2px 20px #888;
    }

    .f-lg {
        font-size: 58px;
    }
</style>
