let emptyState = {
  count: 0,
  data: [],
}

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'CHARITY_FIND':
      return payload
    case 'CHARITY_REMOVE':
      return emptyState
    default:
      return state
  }
}