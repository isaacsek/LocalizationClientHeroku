import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_USER,
  FETCH_MEDIA_DEVICES,
  TEST_SELECTED,
  SAVE_SETTINGS,
  UPDATE_TEST,
  START_NEW_TEST,
  PAUSE_TEST,
  CLEAR_TEST,
  RESUME_TEST,
  COMPLETE_TEST,
  FETCH_ACTIVE_TEST,
  TIC,
  SAVE_ACTIVE_TEST
} from '../actions/types';

import Test from "../components/testCode/testObject"


export default function(state = {}, action) {
    switch(action.type) {
      case UPDATE_TEST:
        return {...state, activeTest: action.payload};
      case START_NEW_TEST:
        return {...state, activeTest: action.payload};
      case PAUSE_TEST:
        return {...state, testPaused: action.payload};
      case RESUME_TEST:
        return {...state, testPaused: action.payload};
      case CLEAR_TEST:
        return {...state, activeTest: action.payload};
      case COMPLETE_TEST:
        return {...state, activeTest: action.payload};
      case FETCH_ACTIVE_TEST:
        return {...state, activeTest: action.payload};
      case TIC:
        return {...state, activeTest: action.payload};
      case SAVE_ACTIVE_TEST:
        return {...state, activeTest: action.payload};

    }
    return state;
}
