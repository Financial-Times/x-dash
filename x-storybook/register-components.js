const req = require.context('../components/stories', true, /^index.js$/);
const components = req.keys().map(path => req(path));

module.exports = components;
