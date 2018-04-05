const renderToString = require('preact-render-to-string');
const render = require('../shared/render');

module.exports = (req, res) => {
    res.type('text/html').code(200);

    res.send(
        renderToString(render())
    );
};
