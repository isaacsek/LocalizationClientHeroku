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
  START_NEW_TEST,
  PAUSE_TEST,
  RESUME_TEST,
  CLEAR_TEST,
  FETCH_ACTIVE_TEST,
  COMPLETE_TEST,
  UPDATE_TEST,
  TIC,
  SAVE_ACTIVE_TEST
} from './types';
import "../components/testCode/testObject";

//const ROOT_URL = 'http://localhost:3090';


export function signinUser({ username, password }) {
  return function(dispatch) {
    // Submit username/password to the server
    //console.log(ROOT_URL);
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
    axios.get(ROOT_URL + "/updateuser", {
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


export function fetchMediaDevices() {
  var request = navigator.mediaDevices.enumerateDevices();

  return {
    type: FETCH_MEDIA_DEVICES,
    payload: request
  };
}

export function selectTest(test) {
  console.log("A test has been selected: " + test.testNumber);
  return {
    type: TEST_SELECTED, //action type
    payload: test //payload info of object
  };
}






export function saveSettings({ name, password, age, hearingDevice, deviceSide}) {
  console.log(name, password, age, hearingDevice);
  const config = { headers: { authorization: localStorage.getItem('token')}};
  //return function(dispatch) {
    var response = axios.post(`${ROOT_URL}/savesettings`, { name, password, age, hearingDevice, deviceSide}, config);
    console.log("response ", response);
      //.then(response => {
        //dispatch({ type: FETCH_USER });
        //browserHistory.push('/mainmenu');
      //})
      alert("Settings saved!");
      browserHistory.push('/mainmenu');
      return {
        type: FETCH_USER,
        payload: response
      };
  //}
}

export function updateTest(test) {

  localStorage.setItem("activeTest", JSON.stringify(test));
  return {
    type: UPDATE_TEST,
    payload: test
  };
}

export function startNewTest(test) {
  localStorage.setItem("activeTest", JSON.stringify(test));
  //console.log("startNewTest action, localstroage = " + localStorage.activeTest);
  return {
    type: START_NEW_TEST,
    payload: test
  }
}

export function pauseTest() {
  return {
    type: PAUSE_TEST,
    payload: true
  }
}

export function resumeTest() {
  return {
    type: RESUME_TEST,
    payload: false
  }
}

export function clearTest() {
  //console.log(localStorage.activeTest);
  //console.log("removed test");
  localStorage.removeItem("activeTest");
  //console.log(localStorage.activeTest);
  return {
    type: CLEAR_TEST,
    payload: null
  }
}

export function completeTest(test) {
  //localStorage.removeItem("activeTest");
//console.log(test);
  const config = { headers: { authorization: localStorage.getItem('token')}};
  //axios.post(ROOT_URL + "/savetest", test, config);
  //console.log("saved in actions:" + saved);
  return {
    type: COMPLETE_TEST,
    payload: test
  }
}

export function fetchActiveTest() {
  //var x = localStorage.getItem("activeTest");
  //console.log(x);
  if(localStorage.getItem("activeTest") == null) {
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

export function tic(test) {
  //console.log(test.timeLeft);
  test.timeLeft = test.timeLeft - 1;
  return {
    type: TIC,
    payload: test
  }
}

export function saveTest(test) {
  const config = { headers: { authorization: localStorage.getItem('token')}};
  axios.post(ROOT_URL + "/savetest", test, config);

  return {
    type: SAVE_ACTIVE_TEST,
    payload: test
  }
}
