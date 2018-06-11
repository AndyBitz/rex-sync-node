// packages
const args = require('args')

const log = require('./util/log')
const config = require('./lib/config')
const watcher = require('./lib/watch')


args
  .option('start', `Watch files and only upload changes [Default]`)
  .option('init', `Upload all files that rex-sync-node will find`)

const flags = args.parse(process.argv)


const main = async () => {
  log('starting')

  // update config
  config.add('flags', flags)

  // watch directories
  watcher(config)
}

module.exports = main
