// packages
const config = require('./config')
const log = require('../util/log')
const fetch = require('node-fetch')
const FormData = require('form-data')
const {createReadStream} = require('fs')
const getQueue = require('../util/queue')
const isDebug = require('../util/is-debug')

// create a process queue that processes each process
// one after another
const queue = getQueue()


module.exports = ({ type, event, path }) => queue.push(async () => {
  // start routine to upload/update a file
  const relpath = path.replace(config[type], '')

  log(`${event} in ${type} - ${relpath}`)

  const write = (...args) => {
    console.log(' '.repeat(10), ...args)
  }

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
      write(`[Debug] buffer for ${event} in ${type} - ${relpath}`)
      write(`[Debug] ${buffer}`) 
    }

    try {
      const result = JSON.parse(buffer)
      if (result.error) {
        write(result.error)
      } else {
        write(`updated`)
      }
    } catch(err) {
      console.errorlog(`buffer`)
      console.errorlog(err)
      console.errorlog('\n')
    }
  } else {
    write(`failed - status: ${response.status}`)
  }
})
