<template>
    <div id="app">
        <notifications></notifications>
        <router-view/>
    </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            let vm = this;
            if (vm.$ml.current == 'ar') {
                import("@/assets/app.css")
            }
        },
    };
</script>
