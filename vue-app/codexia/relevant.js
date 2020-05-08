
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
  'airbnb',
  'LinkedIn'
]

function notRelevant(repoName) {
  return bigCompany.some(company => repoName.startsWith(company))
}

module.exports = { notRelevant }
