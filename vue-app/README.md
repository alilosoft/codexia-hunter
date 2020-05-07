# Codexia-Hunter-Vue

This is the front-end Vue.js app for Codexia-Hunter bot, used to manually filter Github projects to select only relevant once (see Codexia.org [terms](https://www.codexia.org/terms) & [focus](https://www.codexia.org/focus))

## TODO

- [x] Submit ticket to codexia about /recent projects count and /submit response type
- [x] Handle errors in addRepo() to firebase.
- [x] Show last commit date instead of last_update date.
- [x] Show LoC from [CodeTabs](https://codetabs.com/).
- [ ] Use Vue.js components.
- [ ] Switch to TypeScript.
- [ ] Move utils functions to separate files.
- [ ] Add star a github project, and bookmark it directly in codexia-hunter.
- [x] Fetch all relevant repos from firebase.
- [x] Get submitted repos from codexia.org/recent.
- [ ] Save Github query, page and item # to firebase
- [x] Make date parameter in github query dynamic
- [ ] Use octokit/rest.js lib for GitHub API
- [ ] Use Vuefire.js lib https://vuefire.vuejs.org/vuefire/#why
- [ ] Introduce a testing lib (jest, mocha)
- [ ] Add interesting projects section
- [ ] Fetch only new projects from codexia
- [ ] Clean data/firebase.js functions
- [ ] remove usage of this.\$parent anti-pattern in Main.vue
      <https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-the-Parent-Component-Instance>

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
