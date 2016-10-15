import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_USER,
  FETCH_MEDIA_DEVICES,
  TEST_SELECTED,
  SAVE_SETTINGS
} from '../actions/types';

export default function(state = {}, action) {
  console.log("action ", action);
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case FETCH_USER:
      return { ...state, user: action.payload };
    case FETCH_MEDIA_DEVICES:
      return {...state, mediaDevices:action.payload};
    case TEST_SELECTED:
      return {...state, testSelected:action.payload};
  }

  return state;
}
