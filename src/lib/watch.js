// packages
const push = require('./push')
const log = require('../util/log')
const chokidar = require('chokidar')
const getQueue = require('../util/queue')


module.exports = (config) => {
  // options for chokidar
  const options = {
    ignoreInitial: !Boolean(config.flags['init'])
  }

  // watch addons
  chokidar.watch(config.addons, options)
    .on('addDir', () => log('watching addons'))
    .on('change', (path) => push({ type: 'addons', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'addons', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'addons', event: 'add', path }))


  // watch assets
  chokidar.watch(config.assets, options)
    .on('addDir', () => log('watching assets'))
    .on('change', (path) => push({ type: 'assets', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'assets', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'assets', event: 'add', path }))


  // watch modules
  chokidar.watch(config.modules, options)
    .on('addDir', () => log('watching modules'))
    .on('change', (path) => push({ type: 'modules', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'modules', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'modules', event: 'add', path }))


  // watch templates
  chokidar.watch(config.templates, options)
    .on('addDir', () => log('watching templates'))
    .on('change', (path) => push({ type: 'templates', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'templates', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'templates', event: 'add', path }))

  // start to process queue after everything has been added
  getQueue().start()
}
