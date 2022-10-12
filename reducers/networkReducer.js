export function networkReducer(state = null, action) {
  switch (action.type) {
    case 'CONNECTION_AVAILABLE':
      return action.payload;
    case 'CONNECTION_NOT_AVAILABLE':
      return action.payload;
    default:
      return state;
  }
}
