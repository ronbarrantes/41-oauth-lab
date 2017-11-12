import superagent from 'superagent'

// sync => object
export const set = (user) => ({
  type: 'CLIENT_PROFILE_SET',
  payload: user,
})

// async => function


export const create = (user) => (store) => {
  let { token } = store.getState()
  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(user)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

export const fetch = () => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/profiles/me`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

export const update = (user) => (store) => {
  let { token } = store.getState()
  return superagent.put(`${__API_URL__}/profiles/${user._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(user)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

