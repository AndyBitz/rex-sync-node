// packages
const push = require('./push')
const log = require('../util/log')
const chokidar = require('chokidar')


module.exports = (config) => {
  // watch addons
  chokidar.watch(config.addons)
    .on('addDir', () => log('watching addons'))
    .on('change', (path) => push({ type: 'addons', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'addons', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'addons', event: 'add', path }))


  // watch assets
  chokidar.watch(config.assets)
    .on('addDir', () => log('watching assets'))
    .on('change', (path) => push({ type: 'assets', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'assets', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'assets', event: 'add', path }))


  // watch modules
  chokidar.watch(config.modules)
    .on('addDir', () => log('watching modules'))
    .on('change', (path) => push({ type: 'modules', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'modules', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'modules', event: 'add', path }))


  // watch templates
  chokidar.watch(config.templates)
    .on('addDir', () => log('watching templates'))
    .on('change', (path) => push({ type: 'templates', event: 'change', path }))
    .on('unlink', (path) => push({ type: 'templates', event: 'unlink', path }))
    .on('add', (path) => push({ type: 'templates', event: 'add', path }))
}
