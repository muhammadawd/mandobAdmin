<template>
    <div>

        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row d-none">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="________________________________________"
                                type="gradient-default"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-nowrap">________________________________________</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="________________________________________"
                                type="gradient-info"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-nowrap">________________________________________</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="________________________________________"
                                type="gradient-default"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-nowrap">________________________________________</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="________________________________________"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-nowrap">________________________________________</span>
                        </template>
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
        mounted() {

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
        margin-left: -10px;
        margin-right: -10px;
        box-shadow: 1px 2px 20px #888;
    }

    .f-lg {
        font-size: 58px;
    }
</style>
