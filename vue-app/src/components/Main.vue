<template src="./template.html"> </template>
<style src="./style/style.css"></style>
<style src="./style/buttons.css"></style>
<style src="./style/tags.css"></style>

<script>
  import firebase from '../../data/firebase'
  import GitHubSearch from '../../data/github'
  import secrets from '../../config/secrets'
  import axios from 'axios'
  import { DateTime } from 'luxon'
  export default {
    name: 'Main',
    props: {
      msg: String
    },
    data() {
      return {
        ghQuery: 'framework stars:100..10000 pushed:>2020-01-01',
        ghSearch: new GitHubSearch(this.showError),
        page: 17,
        totalCount: 0,
        ghSearchResults: [],
        relevantReposNames: [],
        submittedReposNames: []
      }
    },
    // only runs when dependencies changed, the results are cached
    computed: {
      relevantCount() {
        return this.relevantReposNames.length
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
        this.relevantReposNames = Object.values(relevantRepos)
        console.debug(this.relevantReposNames)
        const submittedRepos = await firebase.getSubmittedRepos()
        this.submittedReposNames = submittedRepos
        console.debug(this.submittedReposNames)
      },

      async search() {
        // clear previous result
        this.ghSearchResults = []
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
            this.ghSearchResults = results.items
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

      selectRepo(repo) {
        const relRepo = { id: repo.id, name: repo.full_name }
        firebase
          .addRelevantRepo(relRepo)
          .then(() => {
            console.debug(relRepo.name + ' added to firebase')
            this.relevantReposNames.push(repo.full_name)
          })
          .catch(err => {
            this.showError('Error selecting ' + relRepo.name)
            console.error(err)
          })
      },

      removeSelected(repo) {
        // https://stackoverflow.com/a/5767357/5724706
        firebase
          .removeRelevantRepo(repo.id)
          .then(() => {
            const index = this.relevantReposNames.indexOf(repo.full_name)
            this.relevantReposNames.splice(index, 1)
            console.debug(repo.name + ' removed!')
          })
          .catch(err => {
            this.showError('Error removing ' + repo.name)
            console.error(err)
          })
      },

      isSelected(repo) {
        return this.relevantReposNames.includes(repo.full_name)
      },

      isSubmitted(repo) {
        return this.submittedReposNames.includes(repo.full_name)
      },

      showInfo(msg) {
        // TODO: anti-pattern https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-the-Parent-Component-Instance
        this.$parent.showInfo(msg)
      },

      showWarn(msg) {
        this.$parent.showWarn(msg)
      },

      showError(msg) {
        this.$parent.showError(msg)
      },
      //TODO: delete me
      testNotif() {
        this.showInfo('hello')
        this.showWarn('becarful')
        this.showError('sorry')
      },
      // TODO: this value should be computed based on current date
      outdated(repo) {
        const yearAGo = DateTime.local().minus({ years: 1 })
        return repo.pushed_at <= yearAGo.toISODate()
      },

      famous(repo) {
        return repo.stargazers_count > 10000
      },

      eligible(repo) {
        return !this.famous(repo) && !this.outdated(repo)
      },

      repoInfo(repo) {
        this.lastCommit(repo)
        this.getLoC(repo)
      },

      lastCommit(repo) {
        let headUrl = repo.url + '/commits/HEAD'
        let ghConfig = {
          headers: {
            Authorization: 'token ' + secrets.GITHUB_TOKEN
          }
        }
        axios
          .get(headUrl, ghConfig)
          .then(res => {
            const lastCommitDate = res.data.commit.author.date
            const start = DateTime.fromISO(lastCommitDate)
            const end = DateTime.local()
            const diff = end.diff(start, 'years')
            const msg = repo.name + ' > LastCommit: ' + start.toISODate()
            if (diff.years > 1) this.showWarn(msg)
            else this.showInfo(msg)
          })
          .catch(err => {
            if (err.response) {
              this.showError(err.response.data)
            } else {
              this.showError('Error in lastCommit()')
              console.error(err)
            }
          })
      },

      getLoC(repo) {
        const url = 'https://api.codetabs.com/v1/loc?github=' + repo.full_name
        axios
          .get(url)
          .then(res => {
            const last = res.data.length - 1
            const loc = res.data[last].linesOfCode
            const msg = repo.name + ' > LoC: ' + loc
            if (loc >= 5000) this.showInfo(msg)
            else this.showWarn(msg)
            //console.log(res.data);
          })
          .catch(err => {
            this.showError('Error in getLoC()')
            console.error(err)
          })
      }
    }
  }
</script>
