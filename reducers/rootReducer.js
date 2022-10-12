import { combineReducers } from 'redux';
import { anonymousReducer } from './anonymousReducer';
import { downloadReducer } from './downloadReducer';
import { galleryModalReducer } from './galleryReducer';
import { networkReducer } from './networkReducer';
import { userReducer } from './user';

const rootReducer = combineReducers({
  user: userReducer,
  galleryModal: galleryModalReducer,
  anonymous: anonymousReducer,
  network: networkReducer,
  downloaded: downloadReducer,
});

export default rootReducer;
