<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form" style="height: 250px">

                        <div class="text-center mt-5 pt-5">
                            <h1>Permission Denied <span style="font-size: 50px">403</span></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                dataModel: {
                    username: '',
                    password: ''
                }
            }
        },
        mounted() {

        },
        methods: {
        }
    }
</script>
<style>
</style>
