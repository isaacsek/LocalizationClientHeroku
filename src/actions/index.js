import axios from 'axios';
import { browserHistory } from 'react-router';
import promise from "redux-promise";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_USER,
  FETCH_MEDIA_DEVICES,
  TEST_SELECTED,
  ROOT_URL,
  FETCH_ACTIVE_TEST,
  UPDATE_TEST,
  CLEAR_TEST,
  TIC,
  CHANGE_PASSWORD,
  FETCH_DB,

} from './types';

export function signinUser({ username, password }) {
  return function(dispatch) {
    // Submit username/password to the server
    axios.post("https://localization-server.herokuapp.com/signin", { username, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        //localStorage.setItem("username", response.data.username);
        // - redirect to the route '/feature'
        browserHistory.push('/mainmenu');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { username, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/mainmenu');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        //console.log(response.data.message);
        dispatch({

          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

export function fetchUser() {
  return function(dispatch) {
    axios.get(ROOT_URL + "/fetchuser", {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_USER,
          payload: response.data.token
        });
      });
  }
}

export function fetchDB() {
  return function(dispatch) {
    axios.get(ROOT_URL + "/fetchdb", {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_DB,
          payload: response.data.token
        });
      });
  }
}

export function fetchEvalPass() {
  return function(dispatch) {
    axios.get(ROOT_URL + "/fetchevalpass", {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: "FETCH_EVAL_PASS",
          payload: response.data.token
        });
      });
  }
}

export function fetchMediaDevices() {
  var request = navigator.mediaDevices.enumerateDevices();

  return {
    type: FETCH_MEDIA_DEVICES,
    payload: request
  };
}

export function selectTest(test) {
  return {
    type: TEST_SELECTED, //action type
    payload: test //payload info of object
  };
}

export function selectUser(user) {
  return {
    type: "USER_SELECTED", //action type
    payload: user //payload info of object
  };
}

export function selectUserTest(test) {
  return {
    type: "USER_TEST_SELECTED", //action type
    payload: test //payload info of object
  };
}

export function saveSettings2({ name, password, age, hearingDevice, deviceSide}) {
  const config = { headers: { authorization: localStorage.getItem('token')}};
  var response = axios.post(`${ROOT_URL}/savesettings`, { name, password, age, hearingDevice, deviceSide}, config);
  alert("Settings saved!");
  browserHistory.push('/mainmenu');
  return {
    type: FETCH_USER,
    payload: response
  };
}

export function saveSettings({ name, password, age, hearingDevice, deviceSide}) {
  //const config = { headers: { authorization: localStorage.getItem('token')}};
  return function(dispatch) {
    axios.post(ROOT_URL + "/savesettings", { name, password, age, hearingDevice, deviceSide}, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_USER,
          payload: response
        });
        alert("Settings saved!");
        browserHistory.push('/mainmenu');
      });
  }
}

export function fetchActiveTest() {
  if(localStorage.getItem("activeTest") == null || localStorage.getItem("activeTest") === "undefined") {
    return {
      type: FETCH_ACTIVE_TEST,
      payload: null
    }
  } else {
      return {
        type: FETCH_ACTIVE_TEST,
        payload: JSON.parse(localStorage.activeTest)
      }
  }
}

export function updateTest(test) {
  localStorage.setItem("activeTest", JSON.stringify(test));
  return {
    type: UPDATE_TEST,
    payload: test
  };
}

export function clearTest() {
  localStorage.removeItem("activeTest");
  return {
    type: CLEAR_TEST,
    payload: null
  }
}

export function savePracticeToDB(test) {
  const config = { headers: { authorization: localStorage.getItem('token')}};
  axios.post(ROOT_URL + "/savepractice", test, config);

  return {
    type: UPDATE_TEST,
    payload: test
  }
}

export function saveEvalToDB(test) {
  const config = { headers: { authorization: localStorage.getItem('token')}};
  axios.post(ROOT_URL + "/saveevaluation", test, config);

  return {
    type: UPDATE_TEST,
    payload: test
  }
}

export function tic(test) {
  test.timeLeft = test.timeLeft - 1;
  return {
    type: TIC,
    payload: test
  }
}

export function savePassword({password}) {
  const config = { headers: { authorization: localStorage.getItem('token')}};
  var response = axios.post(`${ROOT_URL}/savepassword`, {password}, config);
  alert("Password saved!");
  browserHistory.push('/mainmenu');
  return {
    type: FETCH_USER,
    payload: response
  };
}
