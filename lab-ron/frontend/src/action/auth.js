import superagent from 'superagent'
import { cookieDelete } from '../lib/util.js'

// synchronous functions => object
export const tokenSet = token =>
  ({ type: 'TOKEN_SET', payload: token })

export const tokenRemove = () =>
  ({ type: 'TOKEN_REMOVE' })

export const logout = () => {
  cookieDelete('X-CharityChoice-Token')
  return tokenRemove()
}

// async functions => function
export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/auth`)
    .send(user)
    .withCredentials()
    .then(res => {
      console.log({ res })
      return store.dispatch(tokenSet(res.body.token))
    })
}

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/auth`)
    .auth(user.username, user.password)
    .withCredentials()
    .then(res => {
      console.log({ res })
      return store.dispatch(tokenSet(res.body.token))
    })
}
