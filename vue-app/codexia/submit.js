const axios = require("axios").default; // CommonJS
const firebase = require("../data/firebase");
const API_TOKEN = require("../config/secrets").CODEXIA_TOKEN;
const DateTime = require("luxon").DateTime;
const today = DateTime.local().toISODate();

async function submitAll() {
  const repos = await firebase.getRelevantRepos();
  const reposNames = Object.values(repos);
  console.log("relevant repos count: " + reposNames.length);
  for (const repo of reposNames) {
    await submit(repo);
  }
  console.log("saving submitted...");
  await firebase.saveSubmittedRepos(repos, today);
  firebase.db().goOffline();
}

submitAll().catch(console.error);

//************************************ */
// TODO: use axios create
const config = {
  headers: {
    "X-Codexia-Token": API_TOKEN,
  },
};

// todo: use axios create
async function submit(repo) {
  let url =
    "https://www.codexia.org/submit?platform=github&coordinates=" + repo;

  await axios
    .post(url, {}, config)
    .then((r) => console.log(repo + " -> " + r.statusText))
    .catch((e) => {
      console.log("Error submitting " + repo);
      console.log(e);
    });
}

//submit("test");
