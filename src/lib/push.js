// packages
const config = require('./config')
const log = require('../util/log')
const fetch = require('node-fetch')
const FormData = require('form-data')
const {createReadStream} = require('fs')
const isDebug = require('../util/is-debug')


module.exports = async ({ type, event, path }) => {
  // start routine to upload/update a file
  const relpath = path.replace(config[type], '')
  log(`${event} in ${type} - ${relpath}`)

  const form = new FormData()
  form.append('rex-sync-request', 1)
  form.append('type', type)
  form.append('event', event)
  form.append('path', relpath)

  if (event === 'add' || event === 'change') {
    form.append('file', createReadStream(path))
  }

  const options = {
    method: 'POST',
    headers: {
      'Auth': config.auth,
      'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
    },
    body: form
  }

  const url = `${config.website}/redaxo/index.php`
  const response = await fetch(url, options)

  if (response.status === 200) {
    const buffer = await response.text()

    if (isDebug) {
      // debug only
      console.log(`buffer for ${event} in ${type} - ${relpath}`)
      console.log(buffer) 
      console.log('\n')
    }

    try {
      const result = JSON.parse(buffer)
      if (result.error) {
        log(result.error)
      } else {
        log(`updated ${relpath}`)
      }
    } catch(err) {
      console.error(buffer)
      console.error(err)
      console.error(`\n`)
    }
  } else {
    log(`failed - status: ${response.status}`)
  }
}
