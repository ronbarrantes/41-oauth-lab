import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducer'
import App from './component/app'
import thunk from './lib/redux-thunk.js'
import reporter from './lib/redux-reporter.js'

const store = createStore(reducer, applyMiddleware(thunk, reporter))

let container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  container)