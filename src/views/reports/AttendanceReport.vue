<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <button class="btn btn-secondary d-print-none" @click="print()">
                <i class="fas fa-print"></i>
            </button>
            <button class="btn btn-dark d-print-none" @click="exportDataXlsx()" :disabled="!tableData.length">
                {{$ml.get('download')}}
            </button>
            <div class="row">
                <div class="col-md-3 text-right">
                    <!--                    <flat-pickr class="form-control" v-model="dataModel.date"></flat-pickr>-->
                    <!--                    <br>-->
                    <select class="form-control" v-model="dataModel.month" @change="getAllAbsence()">
                        <option v-for="(month , key) in months" :key="key" :value="month.value">{{month.title}}</option>
                    </select>
                </div>
                <div class="col-md-2 text-right">
                    <!--                    <flat-pickr class="form-control" v-model="dataModel.date"></flat-pickr>-->
                    <!--                    <br>-->
                    <select class="form-control" v-model="dataModel.year" @change="getAllAbsence()">
                        <option v-for="(year , key) in years" :key="key" :value="year">{{year}}</option>
                    </select>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col">
                    <div class="card shadow border-0">
                        <div class="map-canvas"
                             style="min-height: 600px;">
                            <div class="table-responsive">
                                <div class="main-content">
                                    <div class="title">{{$ml.get('attendance_report')}}</div>
                                    <div class="table-responsive">
                                        <table class="table" id="printMe">
                                            <tr class="cells">
                                                <td class="cells__spacer"></td>
                                                <td class="cells__alphabet" v-for="(day , key) in days_count"
                                                    :key="key">
                                                    {{day}}
                                                </td>
                                            </tr>

                                            <tr class="cells" v-for="(person , index) in tableData" :key="index">
                                                <td class="cells__names text-right" dir="rtl">{{person.name}}  ({{person.barcode}}) </td>
                                                <td class="cells__alphabet text-center bg-white"
                                                    v-for="(day , key) in person.days">
                                                    <div v-if="!getDates(day).length"><i
                                                            class="fas fa-times text-danger"></i></div>
                                                    <div v-for="time in getDates(day)" class="font-weight-bold">
                                                        {{time}}
                                                    </div>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                    <!--                                    <div class="cells">-->
                                    <!--                                        <div class="cells__spacer"></div>-->
                                    <!--                                        <div class="cells__alphabet" v-for="(day , key) in 31">{{day}}</div>-->
                                    <!--                                        &lt;!&ndash;                                        <input class="cells__input"/>&ndash;&gt;-->
                                    <!--                                    </div>-->
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

    import XLSX from 'xlsx'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    export default {
        data() {
            return {
                selectValue: null,
                tableData: [],
                isLoading: true,
                disable: false,
                days_count: 30,
                months: [
                    {
                        value: 1,
                        title: 'يناير',
                    },
                    {
                        value: 2,
                        title: 'فبراير',
                    },
                    {
                        value: 3,
                        title: 'مارس',
                    },
                    {
                        value: 4,
                        title: 'ابريل',
                    },
                    {
                        value: 5,
                        title: 'مايو',
                    },
                    {
                        value: 6,
                        title: 'يونية',
                    },
                    {
                        value: 7,
                        title: 'يوليو',
                    },
                    {
                        value: 8,
                        title: 'اغسطس',
                    },
                    {
                        value: 9,
                        title: 'سبتمبر',
                    },
                    {
                        value: 10,
                        title: 'اكتوبر',
                    },
                    {
                        value: 11,
                        title: 'نوفمبر',
                    },
                    {
                        value: 12,
                        title: 'ديسمبر',
                    },
                ],
                dataModel: {
                    // date: new Date(),
                    month: (new Date()).getMonth() + 1,
                    year: (new Date()).getFullYear()
                }
            }
        },
        mounted() {
            let vm = this;
            vm.getAllAbsence();
        },
        components: {
            flatPickr
        },
        computed: {
            years() {
                const year = new Date().getFullYear()
                return Array.from({length: year - 2010}, (value, index) => 2011 + index)
            }
        },
        methods: {
            getDates(day) {
                return _.map(day, 'time')
            },
            print() {
                window.print()
                // this.$htmlToPaper('printMe')
            },
            exportDataXlsx() {
                let vm = this;
                let arrData = vm.prepareData();
                var attendanceWS = XLSX.utils.json_to_sheet(arrData)
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, attendanceWS, 'students');
                XLSX.writeFile(wb, 'Attendance' + (new Date()).getTime() + '.xlsx')
            },
            prepareData() {
                let vm = this;
                let header = [];
                let body = [];
                header.push(null);
                for (let i = 0; i < vm.days_count; i++) {
                    header.push(i + 1)
                }
                body.push(header);
                _.forEach(vm.tableData, (item, index) => {
                    let row = [];
                    let client = item.name + ' ' + '(' + item.barcode + ')';
                    let days = item.days;
                    row.push(client);
                    _.forEach(days, (item, index) => {
                        let _days = vm.getDates(item);
                        let days_str = _.join(_days, '~');
                        row.push(days_str)
                    });
                    body.push(row)
                });
                console.log(body)
                return body;
            },
            getAllAbsence() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().get(window.serviceAPI.ALL_ABSENCE, {
                        params: vm.dataModel
                    })
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                vm.tableData = response.data.persons;
                                vm.days_count = response.data.days_count;
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

<style scoped>

    .main-content {
        min-height: 50vh;
        max-width: 100%;
    }

    .main-content > div {
        max-width: 100%;
    }

    .title {
        background: #217346;
        text-align: center;
        place-content: center;
        color: #fff;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        padding-top: 10px;
    }

    .cells {
        position: relative;
    }

    .cells__spacer {
        background: #e6e6e6;
        position: relative;
        border-left: 1px solid #888;
    }

    .cells__spacer:after {
        content: "";
        position: absolute;
        left: 80%;
        bottom: 4px;
        height: 80%;
        width: 100%;
        background: linear-gradient(135deg, transparent 30px, #bbb 43px, #bbb 55px, transparent 55px)
    }

    .cells__alphabet {
        background: #e6e6e6;
        width: 80px;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }

    .cells__names {
        background: #e6e6e6;
        width: 80px;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-weight: bold;
        padding: 5px 15px;
        white-space: pre;
    }

    .card .table td, .card .table th {
        text-align: right;
        padding: 8px;
    }
</style>
