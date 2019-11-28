<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form">
                        <h1 class="text-center">{{$ml.get('login')}}</h1>
                        <base-input class="input-group-alternative mb-3"
                                    :placeholder="$ml.get('email')"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>
                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    :placeholder="$ml.get('password')"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4">{{$ml.get('sign_in')}}</base-button>
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
                model: {
                    email: '',
                    password: ''
                }
            }
        },
        mounted() {

        }
    }
</script>
<style>
</style>
