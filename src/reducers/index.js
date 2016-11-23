import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import activeTestReducer from "./activeTest_reducer";

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  activeTest: activeTestReducer
});

export default rootReducer;
