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
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import MainMenu from "./components/mainmenu.js";
import Play from "./components/play";
import PlayPanner from "./components/playPanner";
import Test from "./components/test";
import Settings from "./components/settings";
import History from "./components/history";
import TestView from "./components/testview";
import TimedPlay from "./components/playPannerTimed";
import TestingMode from "./components/testCode/testingMode";

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
        <Route path="feature" component={RequireAuth(Feature)} />
        <Route path="mainmenu" component={RequireAuth(MainMenu)} />
        <Route path="play" component={RequireAuth(Play)} />
        <Route path="playpanner" component={RequireAuth(PlayPanner)} />
        <Route path="test" component={RequireAuth(Test)} />
        <Route path="settings" component={RequireAuth(Settings)} />
        <Route path="history" component={RequireAuth(History)} />
        <Route path="testview" component={RequireAuth(TestView)} />
        <Route path="playpannertimed" component={RequireAuth(TimedPlay)} />
        <Route path = "testingmode" component = {RequireAuth(TestingMode)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#container'));
