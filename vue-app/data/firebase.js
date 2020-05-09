// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
const firebase = require('firebase/app')
// Add the Firebase products that you want to use
require('firebase/database')
//const { DateTime } = require('luxon')

const FIREBASE_CONFIG = require('../config/secrets').FIREBASE_CONFIG

// Initialize Firebase
const _app = firebase.initializeApp(FIREBASE_CONFIG)
const _db = (app = _app) => app.database()
//const today = DateTime.local().toISODate()

/**
 * fetch relevant repos stored in firebase
 * @param {firebase.database.Database} db a default instance is provided, you can provide yours!
 */
function getRelevantRepos(db = _db()) {
  const relevantRepos = db.ref('relevantRepos')
  return new Promise((resolve, reject) => {
    relevantRepos
      .once('value')
      .then(snap => {
        let repos = snap.val()
        if (repos == null) repos = {}
        resolve(repos)
      })
      .catch(err => reject(err))
  })
}

/**
 * @param ghRepo:  { id: Number, name: String }
 * @param {firebase.database.Database} db: realtime database
 * @returns promise that resolves/rejects when the operation complete
 */
function addRelevantRepo(ghRepo, db = _db()) {
  return db
    .ref('relevantRepos')
    .child(ghRepo.id)
    .set(ghRepo.name)
}

/**
 *  Remove a repo by its id
 * @param {firebase.database.Database} db
 * @param { Number } repoId Github repo id
 */
function removeRelevantRepo(repoId, db = _db()) {
  // remove repo by id
  return db
    .ref('relevantRepos')
    .child(repoId)
    .remove()
}

/**
 * Save submitted repos
 * @param {Array} repos
 * @param {String} child optional- creat a sub reference under "submittedRepos"
 * @param {firebase.database.Database} db
 */
async function saveSubmittedRepos(repos, child, db = _db()) {
  let ref = db.ref('submittedRepos')
  if (child) ref = ref.child(child)
  await ref.set(repos)
  return repos
}

/**
 *  Fetch submitted repos
 * @param { String } child optional- sub reference under "submittedRepos"
 * @param {firebase.database.Database} db
 * @returns array of submitted repos
 */
async function getSubmittedRepos(child = 'codexia', db = _db()) {
  let submittedRef = db.ref('submittedRepos')
  if (child) submittedRef = submittedRef.child(child)
  const snap = await submittedRef.once('value')
  let all = []
  snap.forEach(s => {
    all = all.concat(s.val())
  })
  return all
}

async function removeSubmittedFromRelevant() {
  const submitted = await getSubmittedRepos('codexia')
  const submittedNames = submitted.map(r => r.full_name)
  const relevant = await getRelevantRepos()
  const relevantIDs = Object.keys(relevant)
  const notSubmitted = []
  for (const id of relevantIDs) {
    const repoName = relevant[id]
    const isSubmitted = submittedNames.includes(repoName)
    if (isSubmitted) await removeRelevantRepo(id)
    else notSubmitted.push(repoName)
  }
  return notSubmitted
}

/**
 * Use firebase db instance to run action() arg then turn db offline
 * @param {CallableFunction} action
 */
async function run(action) {
  await action()
  _db().goOffline()
}

//** TODO */
function findRepoByName(repoName, db) {
  // https://stackoverflow.com/a/47909055/5724706
  const query = db
    .ref('relevantRepos')
    .orderByValue()
    .equalTo(repoName)
  query
    .once('value')
    .then(snap => console.log(repoName + ' found:' + snap.val()))
}

console.log('loading module: firebase')
module.exports = {
  app: _app,
  db: _db,
  addRelevantRepo,
  removeRelevantRepo,
  findRepoByName,
  getRelevantRepos,
  saveSubmittedRepos,
  getSubmittedRepos,
  removeSubmittedFromRelevant,
  run
}
