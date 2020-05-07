const firebase = require('../data/firebase')

firebase.getSubmittedRepos().then(submitted => {
  const names = submitted.map(p => p.coordinates)
  console.log(names)
  firebase.db().goOffline()
})
