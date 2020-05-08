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
  'linkedin'
]
/**
 * @param {string} repoName
 */
function notRelevant(repoName) {
  return bigCompany.some(company =>
    repoName.toLowerCase().startsWith(company.toLowerCase())
  )
}

module.exports = { notRelevant }
