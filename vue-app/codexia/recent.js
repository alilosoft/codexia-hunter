const axios = require('axios').default
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
function codexiaRecent(page = 0) {
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
    console.debug('page:' + page + ' size:' + recent.length + ' more:' + more)
    page++
  } while (more)
  return all
}

module.exports = {
  codexiaRecent,
  codexiaAll
}
