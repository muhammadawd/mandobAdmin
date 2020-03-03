<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form">
                        <h1 class="text-center">{{$ml.get('login')}}</h1>
                        <base-input class="input-group-alternative mb-3"
                                    :placeholder="$ml.get('username')"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="dataModel.username">
                        </base-input>
                        <div class="text-danger error_text" id="username_error"></div>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    :placeholder="$ml.get('password')"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="dataModel.password">
                        </base-input>
                        <div class="text-danger error_text" id="password_error"></div>

                        <div class="text-center">
                            <base-button type="primary" @click="login()" class="my-4">{{$ml.get('sign_in')}}
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
                    username: '',
                    password: ''
                }
            }
        },
        mounted() {

        },
        methods: {
            login() {
                let vm = this;
                let request_data = vm.dataModel;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                try {
                    window.serviceAPI.API().post(window.serviceAPI.AUTH_ACCOUNT, request_data)
                        .then((response) => {
                            vm.$root.$children[0].$refs.loader.show_loader = false;
                            response = response.data;
                            if (response.status) {
                                window.helper.showMessage('success', vm);
                                let auth_data = response.data;
                                let permissions = _.map(auth_data.admin.role.permissions, 'name');
                                auth_data.permissions = permissions;
                                ls.saveToStorage('auth_data', auth_data)
                                vm.$router.push({name: 'dashboard'})
                                return null;
                            }

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
