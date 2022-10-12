export function anonymousReducer(state = null, action) {
  switch (action.type) {
    case 'LOGOUT_ANONYMOUS':
      return action.payload;
    case 'ANONYMOUS_LOGIN':
      return action.payload;
    default:
      return state;
  }
}
