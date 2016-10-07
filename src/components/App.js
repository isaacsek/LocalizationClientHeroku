import React from 'react';
import { Component } from 'react';
//import '../assets/stylesheets/base.scss';
//import '../assets/stylesheets/style.css';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
