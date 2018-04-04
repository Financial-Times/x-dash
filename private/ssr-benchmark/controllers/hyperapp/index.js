const { renderToString } = require('@hyperapp/render');
const render = require('../shared/render');

module.exports = (req, res) => {
    res.type('text/html').code(200);

    res.send(
        renderToString(render())
    );
};
