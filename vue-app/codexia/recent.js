const axios = require('axios').default
const firebase = require('../data/firebase')
const API_TOKEN = require('../config/secrets').CODEXIA_TOKEN

let config = {
  method: 'GET',
  base_url: 'https://www.codexia.org/recent.json',
  headers: {
    'X-Codexia-Token': API_TOKEN
  }
}

/**
 *
 * @param {Number} page
 * @returns {Promise<Array>} codexia recent projects per page
 */
function codexiaRecent(page) {
  return axios
    .get('https://www.codexia.org/recent.json?page=' + page, config)
    .then(res => {
      return res.data
    })
}

/**
 * Fetch all projects submitted to Codexia.org
 * @param {Number} fromPage
 * @param {Number} pageSize =25. Currently the API returns 25 project/page
 */
async function codexiaAll(fromPage = 0, pageSize = 25) {
  const all = []
  let page = fromPage
  let more = false
  do {
    const recent = await codexiaRecent(page)
    all.push(...recent)
    more = recent.length == pageSize
    console.debug('page:' + page + ' count:' + recent.length + ' more:' + more)
    page++
  } while (more)
  return all
}

// TODO: only fetch/save recent projects, by storing last id
async function codexiaToFirebase() {
  // fetch Codexia's projects
  const codexiaProjects = await codexiaAll()
  const projNames = codexiaProjects.map(p => p.coordinates)
  console.debug('codexia projects count:' + projNames.length)
  // save codexia projects to firebase
  await firebase.saveSubmittedRepos(projNames, 'codexia')
  const firebaseSubmitted = await firebase.getSubmittedRepos('codexia')
  console.debug('firebase submitted count:' + firebaseSubmitted.length)
  // remove submitted projects from relevant projects on firebase
  // TODO: pass relevant and submitted as parameter
  await firebase.removeSubmittedFromRelevant().then(waiting => {
    console.log('not submitted yet: ' + waiting.length)
    console.log(waiting)
  })
  firebase.db().goOffline()
}
codexiaToFirebase().catch(console.error)

module.exports = {
  codexiaRecent
}
