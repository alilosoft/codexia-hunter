const firebase = require("../data/firebase");

async function test(description, action) {
  console.time(description); // https://stackoverflow.com/a/1975103/5724706
  await action();
  console.timeEnd(description);
  return;
}

// TODO: use a testing library to real automated test
// clean async-await
async function run() {
  console.time("run tests");

  test("db() instance", () => firebase.db());

  const fakeRepo = { id: "123", name: "test/repo123" };

  await test("addRelevant", () => firebase.addRelevantRepo(fakeRepo));

  await test("getRelevant", async () => {
    const repos = await firebase.getRelevantRepos();
    console.log("relevant repos fetched:");
    console.log(repos);
  });

  await test("save submitted", () =>
    firebase.saveSubmittedRepos(fakeRepo, "test"));

  await test("get submitted", async () => {
    const repos = await firebase.getSubmittedRepos();
    console.log("submitted repos count: " + repos.length);
  });

  await test("remove relevant repo", () => {
    firebase.removeRelevantRepo(fakeRepo.id);
  });

  // should be last action, because offline db cause some tests to not run
  await test("db offline", () => firebase.db().goOffline());
  console.timeEnd("run tests");
}

//run();

// test("get submitted", () => {
//   firebase
//     .getSubmittedRepos()
//     .then((repos) => console.log("submitted repos count: " + repos.length));
// });

// data.removeRelevantRepo(fakeRepo.id, db).then(() => {
//   db.goOffline();
// });

// data.removeRelevantRepo(1, db).then(() => {
//   db.goOffline();
// });
