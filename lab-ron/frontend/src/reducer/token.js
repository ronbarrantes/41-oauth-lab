import * as util from '../lib/util.js'

let token = util.cookieFetch('X-CharityChoice-Token')
let initialState = token ? token : null

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state
  }
}
