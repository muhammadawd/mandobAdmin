<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form">
                        <h1 class="text-center">{{$ml.get('reset_password')}}</h1>
                        <base-input class="input-group-alternative"
                                    type="password"
                                    :placeholder="$ml.get('password')"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="dataModel.password">
                        </base-input>
                        <div class="text-danger error_text" id="token_error"></div>
                        <div class="text-danger error_text" id="password_error"></div>

                        <base-input class="input-group-alternative"
                                    type="password"
                                    :placeholder="$ml.get('password_confirmation')"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="dataModel.password_confirmation">
                        </base-input>
                        <div class="text-danger error_text" id="password_confirmation_error"></div>

                        <div class="text-center">
                            <base-button type="primary" @click="login()" class="my-4">{{$ml.get('change')}}
                            </base-button>
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
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            login() {
                let vm = this;
                let request_data = vm.dataModel;
                request_data.token = vm.$route.params.token;
                console.log(request_data)
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.RESET_ACCOUNT, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                $('.error_text').text('');
                                window.helper.showMessage('success', vm);
                                return null;
                            }
                            vm.$router.push({name: 'login'});

                        }).catch((error) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        window.helper.handleError(error, vm);
                    });
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>
<style>
</style>
