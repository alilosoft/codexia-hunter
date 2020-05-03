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
        notifType: {
          INFO: { backgroundColor: '#64dd17' },
          WARN: { backgroundColor: '#ff9800' },
          ERROR: { backgroundColor: 'crimson', color: 'white' }
        },
        notifications: [], // {message: "", color: color}
        query: 'stars:100..10000 pushed:>2019-05-01',
        page: 1,
        per_page: 25,
        total_count: 0,
        gh_repos: [],
        sel_repos_names: [],
        sel_topics: [],
        submitted_repos: [],
        relevantRepo: []
      }
    },
    // only runs when dependencies changed, the results are cached
    computed: {
      selCount() {
        return this.sel_repos_names.length
      }
    },
    methods: {
      async fetchRelevant() {
        const repos = await firebase.getRelevantRepos()
        this.sel_repos_names = Object.values(repos)
      }
    }
  }
</script>
