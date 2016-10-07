"use strict";
var React = require('react')
var {DefaultRoute, NotFoundRoute, Route} = require('react-router')

var App = require('./components/app');


var Signin = require('./components/auth/signin');

var Signout = require('./components/auth/signout');


var Signup = require('./components/auth/signup');


var Feature = require('./components/feature');


var RequireAuth = require('./components/auth/require_auth');


var Welcome = require('./components/welcome');

var MainMenu = require('./components/mainmenu.js');


var Play = require('./components/play');


var Test = require('./components/test');

var Settings = require('./components/settings');

var History = require('./components/history');

var Testview = require('./components/testview');


module.exports = [


  React.createElement(Route,{ path: "/", component: App },
    React.createElement(IndexRoute, { component: Welcome }),
    React.createElement(Route, { path: "signin", component: Signin }),
    React.createElement(Route, { path: "signout", component: Signout }),
    React.createElement(Route, { path: "signup", component: Signup }),
    React.createElement(Route, { path: "feature", component: RequireAuth(Feature) }),
    React.createElement(Route, { path: "mainmenu", component: RequireAuth(MainMenu) }),
    React.createElement(Route, { path: "play", component: RequireAuth(Play) }),
    React.createElement(Route, { path: "test", component: RequireAuth(Test) }),
    React.createElement(Route, { path: "settings", component: RequireAuth(Settings) }),
    React.createElement(Route, { path: "history", component: RequireAuth(History) }),
    React.createElement(Route, { path: "testview", component: RequireAuth(TestView) })
  )
]
