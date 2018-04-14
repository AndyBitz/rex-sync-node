const resolveConfigPaths = require('./resolve-config-paths')
const {resolve} = require('path')
const cwd = process.cwd()


let config = null
let secrets = null

try {
  config = require(resolve(cwd, 'rex.config.json'))
  config = resolveConfigPaths(config) // make all paths absolute
} catch(err) {
  console.error('Failed to load rex.config.json')
  process.exit(1)
}

try {
  secrets = require(resolve(cwd, 'rex.secrets.json'))
} catch(err) {
  console.error('Failed to load rex.secrets.json')
  process.exit(1)
}

module.exports = { ...config, ...secrets }
