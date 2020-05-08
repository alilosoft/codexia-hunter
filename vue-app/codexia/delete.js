const firebase = require('../data/firebase')
const relevant = require('./relevant')

function shouldDelete(proj) {
  return relevant.notRelevant(proj.coordinates)
}
// console.log('google? ' + shouldDelete({ coordinates: 'google' }))
// console.log('facebook? ' + shouldDelete({ coordinates: 'facebook' }))
// console.log('foo? ' + shouldDelete({ coordinates: 'foo' }))

async function toDelete(filter = shouldDelete) {
  const submitted = await firebase.getSubmittedRepos()
  firebase.db().goOffline()

  const toDelete = submitted
    .filter(filter)
    .filter(p => (p.submitter = 'codexia-hunter'))
  return toDelete
}

async function deleteAll() {
  const all = await toDelete()
  let count = all.length
  console.log('to delete count: ' + count)
  for (let p of all) {
    console.log(count-- + ' > ' + ' delete: ' + p.coordinates)
    await deleteProj(p.id)
  }
}

//deleteAll()

// delete from codexia
async function deleteProj(id) {
  await new Promise(res => {
    setTimeout(() => {
      console.log('deleting...: ' + id)
      // TODO: waiting for #135
      res()
    }, 500)
  })
}
