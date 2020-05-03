<template>
  <div id="app">
    <Main msg="Welcome" />
  </div>
</template>

<script>
  import Main from './components/Main.vue'
  //import firebase from '../data/firebase'
  export default {
    user: 'App',
    components: {
      Main
    }
  }
</script>

<style src="./style.css"></style>
