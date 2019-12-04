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
            console.log()
            setTimeout(() => {
                vm.$refs.loader.show_loader = false;
            }, 1000);

            if (vm.$ml.current == 'ar') {
                import("@/assets/app.css")
            }
        },
    };
</script>
