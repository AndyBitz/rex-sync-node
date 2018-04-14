// packages
const log = require('./util/log')
const config = require('./lib/config')
const watcher = require('./lib/watch')


const main = async () => {
  log('starting')

  // watch directories
  watcher(config)
}

main()
