const Enzyme = require('enzyme')
const Adapter = require('@cfaester/enzyme-adapter-react-18').default
require('jest-enzyme')

Enzyme.configure({ adapter: new Adapter() })

module.exports = Enzyme
