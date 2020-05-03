<template src="./template.html"> </template>
<style src="./style.css"></style>

<script>
  import firebase from '../../data/firebase'
  export default {
    name: 'Main',
    props: {
      msg: String
    },
    data() {
      return {
        relevantRepo: []
      }
    },
    methods: {
      async fetchRelevant() {
        const repos = await firebase.getRelevantRepos()
        this.relevantRepo = Object.values(repos)
      }
    }
  }
</script>
