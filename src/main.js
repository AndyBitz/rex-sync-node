// packages
const args = require('args')

const log = require('./util/log')
const config = require('./lib/config')
const watcher = require('./lib/watch')

args
  .option('start', `Watch files and only upload changes [Default]`)
  .option('init', `Upload and then watch all files that rex-sync will find`)

const flags = args.parse(process.argv)


const main = async () => {
  // update config
  config.add('flags', flags)

  // log start
  log(`watching for ${config.website}`)

  // watch directories
  watcher(config)
}

module.exports = main
