<template>
  <div id="app">
    <Main msg="Welcome" />
    <button @click="fetchRelevant">Relevant</button>
    <ol>
      <li v-for="(repo, index) in relevantRepoNames" :key="index">
        {{ repo }}
      </li>
    </ol>
  </div>
</template>

<script>
  import Main from './components/Main.vue'
  import firebase from '../data/firebase'
  export default {
    user: 'App',
    components: {
      Main
    },
    data() {
      return {
        relevantRepoNames: []
      }
    },
    methods: {
      async fetchRelevant() {
        const repos = await firebase.getRelevantRepos()
        this.relevantRepoNames = Object.values(repos)
      }
    }
  }
</script>

<style src="./style.css"></style>
