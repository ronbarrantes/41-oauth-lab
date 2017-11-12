import superagent from 'superagent'

export const set = charities => ({
  type: 'CHARITY_FIND',
  payload: charities,
})

export const fetch = () => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/charities`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}