// set up app to host main.js file included in server side rendered html
const express = require('express')
const server = express()
server.use(express.static(__dirname))
exports.app = server
