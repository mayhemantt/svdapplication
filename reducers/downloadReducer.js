export function downloadReducer(state = null, action) {
  switch (action.type) {
    case 'SET_DOWNLOADED_TRUE':
      return action.payload;
    case 'SET_DOWNLOADED_FALSE':
      return action.payload;
    default:
      return state;
  }
}
