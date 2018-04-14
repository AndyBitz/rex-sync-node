const chalk = require('chalk')
const name = `[${chalk.red('rex-sync')}]`

module.exports = (...message) => console.log(name, ...message)
