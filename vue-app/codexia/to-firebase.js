const firebase = require('../data/firebase')
const codexia = require('./recent')

function minimize(codexiaProj) {
  const mini = {}
  mini['id'] = codexiaProj.id
  mini['coordinates'] = codexiaProj.coordinates
  mini['submitter'] = codexiaProj.submitter.login
  return mini
}

// TODO: only fetch/save recent projects, by storing last id
async function codexiaToFirebase(converter = minimize, ref = 'codexia') {
  // fetch Codexia projects
  const codexiaProjects = await codexia.codexiaAll()
  console.debug('codexia projects count:' + codexiaProjects.length)
  // convert codexia projects to minimal version
  const toFirebaseProjects = codexiaProjects.map(converter)
  // save codexia projects to firebase
  await firebase.saveSubmittedRepos(toFirebaseProjects, ref)
  // remove submitted projects from relevant projects on firebase
  // TODO: pass relevant and submitted as parameter
  await firebase.removeSubmittedFromRelevant().then(waiting => {
    console.log('not submitted yet: ' + waiting.length)
    console.log(waiting)
  })
  firebase.db().goOffline()
}
codexiaToFirebase().catch(console.error)
