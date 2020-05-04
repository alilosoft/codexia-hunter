<template src="./template.html"> </template>
<style src="./style.css"></style>

<script>
  import firebase from '../../data/firebase'
  import GitHubSearch from '../../data/github'
  export default {
    name: 'Main',
    props: {
      msg: String
    },
    data() {
      return {
        ghQuery: 'stars:100..10000 pushed:>2020-01-01',
        ghSearch: new GitHubSearch(this.showError),
        page: 1,
        totalCount: 0,
        ghRepos: [],
        sel_repos_names: [],
        sel_topics: [],
        submitted_repos: [],
        relevantRepo: [],
        notifType: {
          INFO: { backgroundColor: '#64dd17' },
          WARN: { backgroundColor: '#ff9800' },
          ERROR: { backgroundColor: 'crimson', color: 'white' }
        },
        notifications: [] // {message: "", color: color}
      }
    },
    // only runs when dependencies changed, the results are cached
    computed: {
      selCount() {
        return this.sel_repos_names.length
      }
    },
    methods: {
      async loadRelevant() {
        const repos = await firebase.getRelevantRepos()
        this.sel_repos_names = Object.values(repos)
      },

      async searchGitHub() {
        // clear previous result
        this.ghRepos = []
        this.totalCount = 0
        // build gh query
        console.debug('github query: ' + this.ghQuery + ' page:' + this.page)
        this.ghSearch
          .useQuery(this.ghQuery)
          .page(this.page)
          .search()
          .then(results => {
            console.debug('github search results:')
            console.debug(results)
            this.totalCount = results.total_count
            this.ghRepos = results.items
          })
          .catch(err => {
            this.showError('Error in searchGitHub()\n' + err.message)
          })
      },

      showError(err) {
        console.debug('showError():')
        console.error(err)
      }
    }
  }
</script>
