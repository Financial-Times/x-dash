const path = require('path');

module.exports = (moduleId) => path.join(process.cwd(), 'package.json');
