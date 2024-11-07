// indexnow-notify.js  протокол IndexNow
const https = require('https')

const url =
  'https://yandex.com/indexnow?url=https://nataavodes.ru/new-page&key=64dd328c76bebb04b208c7449191bd91'

https
  .get(url, (res) => {
    console.log(`IndexNow request sent. Status code: ${res.statusCode}`)
  })
  .on('error', (e) => {
    console.error(`IndexNow request failed: ${e.message}`)
  })
