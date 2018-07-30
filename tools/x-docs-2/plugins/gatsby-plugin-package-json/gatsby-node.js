// This plugin will create new nodes for any package manifests found by the filesystem plugin
exports.setFieldsOnGraphQLNodeType = require('./extend-node-type');
exports.onCreateNode = require('./on-create-node');
