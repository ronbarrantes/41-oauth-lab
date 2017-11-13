import { cookieFetch } from './util.js'

export const persist = keys => store => next => action => {
  let result = next(action)
  let state = store.getState()
  keys.forEach(key => {
    window.localStorage[key] = JSON.stringify(state[key])
  })

  return result
}
export const rehydrateLocalStorage = (key, initialState) => {
  try {
    return JSON.parse(window.localStorage[key])
  } catch (err) {
    return initialState
  }
}

export const rehydrateCookie = (key, initialState) => {
  return cookieFetch(key) || initialState
}