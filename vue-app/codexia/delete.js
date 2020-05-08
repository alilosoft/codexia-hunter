const firebase = require('../data/firebase')

const bigCompany = [
  'facebook',
  'google',
  'microsoft',
  'dotnet',
  'ibm',
  'oracle',
  'intel',
  'alibaba',
  'aws',
  'pivotal',
  'mozilla',
  'uber',
  'netflix',
  'spring',
  'apache',
  'azure',
  'amazon',
  'airbnb'
]

function notRelevant(ghRepo) {
  return bigCompany.some(company => ghRepo.full_name.startsWith(company))
}

function shouldDelete(proj) {
  return bigCompany.some(company => proj.coordinates.startsWith(company))
}
// console.log('google? ' + shouldDelete({ coordinates: 'google' }))
// console.log('facebook? ' + shouldDelete({ coordinates: 'facebook' }))
// console.log('foo? ' + shouldDelete({ coordinates: 'foo' }))

async function toDelete(filter = shouldDelete) {
  const submitted = await firebase.getSubmittedRepos()
  firebase.db().goOffline()

  const toDelete = submitted
    .filter(shouldDelete)
    .filter(p => (p.submitter = 'codexia-hunter'))
  return toDelete
}

async function deleteAll() {
  const all = await toDelete()
  let count = all.length
  console.log('to delete count: ' + count)
  for (p of all) {
    console.log(count-- + ' > ' + ' delete: ' + p.coordinates)
    //await deleteProj(p.id)
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

module.exports = notRelevant
