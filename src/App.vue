<template>
  <div id="app">
    <router-view></router-view>
    <br />
  </div>
</template>

<script>
  import './assets/css/basic.css';
  import  Start from './components/Start.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }


}
</script>

<style lang="scss">

</style>
