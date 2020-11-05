const path = require('path')
module.exports = (moduleId) => path.join(process.cwd(), 'node_modules', moduleId)
