import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import MainMenu from "./components/mainmenu.js";
import Settings from "./components/settings";
import ChangePassword from "./components/changepassword";
import History from "./components/history";
import ResultView from "./components/resultView";
import PracticeMode from "./components/practiceCode/PracticeApp";
import EvalMode from "./components/evalCode/evalApp";
import Admin from "./components/adminCode/adminApp";

const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="mainmenu" component={RequireAuth(MainMenu)} />
        <Route path="settings" component={RequireAuth(Settings)} />
        <Route path="changepassword" component={RequireAuth(ChangePassword)}/>
        <Route path="history" component={RequireAuth(History)} />
        <Route path="resultview" component={RequireAuth(ResultView)} />
        <Route path="practicemode" component = {RequireAuth(PracticeMode)} />
        <Route path="evalmode" component = {RequireAuth(EvalMode)} />
        <Route path="admin" component={RequireAuth(Admin)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#container'));
