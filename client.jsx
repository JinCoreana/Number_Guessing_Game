const React = require('react')
const ReactDom = require('react-dom')

const NumberGuessing = require('./number_guessing.jsx')


ReactDom.render(<NumberGuessing/>, document.querySelector('#root'))