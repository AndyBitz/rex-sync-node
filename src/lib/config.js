// packages
const {resolve} = require('path')
const parseWebsite = require('./parse-website')
const resolveConfigPaths = require('./resolve-config-paths')


// current directory
const cwd = process.cwd()

// the true config
let globalConfig = {}

// function to add new properties
const add = (key, value) => globalConfig[key] = value

// temporary vars
let config = null
let secrets = null


// from rex.config.json
try {
  config = require(resolve(cwd, 'rex.config.json'))
  config = resolveConfigPaths(config) // make all paths absolute
} catch(err) {
  console.error('Failed to load rex.config.json')
  process.exit(1)
}

// from rex.secrets.json
try {
  secrets = require(resolve(cwd, 'rex.secrets.json'))
} catch(err) {
  console.error('Failed to load rex.secrets.json')
  process.exit(1)
}

// put everything together
globalConfig = { ...config, ...secrets, add }


// parse the website
globalConfig.website = parseWebsite(globalConfig.website)

// export config
module.exports = globalConfig
