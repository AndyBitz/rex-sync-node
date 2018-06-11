const {resolve} = require('path')


module.exports = (config) => {
  const keys = Object.keys(config)
  const result = {}

  for (let i=0; i < keys.length; i++) {
    const key = keys[i]
    const value = config[key]

    if (key === 'website') {
      continue
    }

    if (value !== 'website') {
      try {
        config[key] = resolve(value)
      } catch(err) {
        console.error(`Could not resolve: ${key} at ${config[key]}`)
      }
    }

  }

  return config
}
