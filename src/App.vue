<template>
    <div id="app">
        <Loader :ref="'loader'"/>
        <notifications></notifications>
        <router-view/>
    </div>
</template>


<script>
    import Loader from './components/Loader';

    export default {
        components: {
            Loader
        },
        data() {
            return {}
        },
        mounted() {
            let vm = this;
            let auth_data = window.ls.getFromStorage('auth_data');
            auth_data = JSON.parse(auth_data);
            // let channel = vm.$pusher.subscribe(`alert-channel-admin-${auth_data.admin.id}`);
            let channel = vm.$pusher.subscribe(`alert-channel-admin`);
            channel.bind(`AlertEvent`, (payload) => {
                console.log(payload)
                payload = payload.alert
                vm.$helper.showNotification(vm, 'primary', payload.title, payload.notes, payload.updated_at)
            });

            setTimeout(() => {
                vm.$refs.loader.show_loader = false;
            }, 1000);

            if (vm.$ml.current == 'ar') {
                import("@/assets/app.css")
            }
        },
    };
</script>
