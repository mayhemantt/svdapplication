export function galleryModalReducer(state = null, action) {
  switch (action.type) {
    case 'OPEN_GALLERY_MODAL':
      return action.payload;
    case 'CLOSE_GALLERY_MODAL':
      return action.payload;
    default:
      return state;
  }
}
