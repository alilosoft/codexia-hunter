<template src="./template.html"> </template>
<style src="./style/style.css"></style>
<style src="./style/buttons.css"></style>

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
        ghQuery: 'framework stars:100..10000 pushed:>2020-01-01',
        ghSearch: new GitHubSearch(this.showError),
        page: 1,
        totalCount: 0,
        ghRepos: [],
        sel_repos_names: [],
        sel_topics: [],
        submittedReposNames: [],
        relevantRepos: {},
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
      relevantReposNames() {
        return Object.values(this.relevantRepos)
      },
      selCount() {
        return this.sel_repos_names.length
      },
      pageSize() {
        return this.ghSearch.pageSize
      },
      pagesCount() {
        return Math.ceil(this.totalCount / this.pageSize)
      }
    },
    methods: {
      async loadData() {
        const relevantRepos = await firebase.getRelevantRepos()
        this.relevantRepos = relevantRepos
        console.debug(this.relevantReposNames)
        const submitted = await firebase.getSubmittedRepos()
        this.submittedReposNames = submitted
        console.debug(this.submittedReposNames)
      },

      async search() {
        // clear previous result
        this.ghRepos = []
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

      nextPage() {
        this.page++
        this.search()
      },

      previousPage() {
        this.page--
        this.search()
      },

      showInfo(msg) {
        console.info(msg)
        this.$parent.showNotification(msg, this.notifType.INFO)
      },

      showWarn(msg) {
        console.warn(msg)
        this.$parent.showNotification(msg, this.notifType.WARN)
      },

      showError(msg) {
        console.error(msg)
        this.$parent.showNotification(msg, this.notifType.ERROR)
      }
    }
  }
</script>
