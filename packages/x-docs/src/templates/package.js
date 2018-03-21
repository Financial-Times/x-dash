const React = require('react');

module.exports = props => <pre>{JSON.stringify(props, null, 2)}</pre>;
