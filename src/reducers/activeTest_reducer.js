import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_USER,
  FETCH_MEDIA_DEVICES,
  TEST_SELECTED,
  SAVE_SETTINGS,
  FETCH_ACTIVE_TEST,
  UPDATE_TEST,
  CLEAR_TEST,
  TIC,
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
      case FETCH_ACTIVE_TEST:
        return {...state, activeTest: action.payload};
      case UPDATE_TEST:
        return {...state, activeTest: action.payload};
      case CLEAR_TEST:
        return {...state, activeTest: action.payload};
      case TIC:
        return {...state, activeTest: action.payload};
    }
    return state;
}
