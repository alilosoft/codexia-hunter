const DateTime = require('luxon').DateTime

const yearAGo = DateTime.local().minus({ years: 1 })
console.log(yearAGo.toISODate())
