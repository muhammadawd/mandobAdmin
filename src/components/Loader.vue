<template>
  <div class="loader_overlay" v-if="showLoader">
    <div class="content">
      <img src="../assets/img/loader.gif" alt="">
      <h4 class="p-0 m-0 text-black">{{$ml.get('loading')}}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    props: ['show'],
    data() {
      return {
        show_loader: true
      }
    },
    computed: {
      showLoader() {
        return this.show_loader;
      }
    }
  }
</script>

<style scoped>
  .loader_overlay {
    background: rgba(255,255,255, 0.7);
    z-index: 9999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .loader_overlay .content {
    width: 210px;
    height: 220px;
    border-radius: 18px;
    margin: 300px auto;
    font-weight: bold;
    background-color: #fff;
  }

  .loader_overlay .content img {
    width: 95%;
    margin-top: 5px;
  }
</style>
