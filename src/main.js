// packages
const {spawn} = require('child_process')


const run = spawn('node', [`${__dirname}/run.js`])

run.stdout.pipe(process.stdout)
run.stderr.pipe(process.stderr)

module.exports = () => run
