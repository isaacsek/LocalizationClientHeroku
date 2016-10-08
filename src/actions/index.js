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
  ROOT_URL
} from './types';

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
        browserHistory.push('/feature');
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
        browserHistory.push('/feature');
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

export function saveSettings({ username, password, age, hearingDevice, deviceSide}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/savesettings`, { username, password, age, hearingDevice, deviceSide})
  }
}
