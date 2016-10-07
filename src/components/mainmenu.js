import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class MainMenu extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
    this.props.fetchMediaDevices();
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  render() {
    return (
      <div>
        <h3 className = "text-md-center m-t-2">Main Menu</h3>

        <center>

          <div className ="btn-group-vertical btn-group-lg m-t-1">
            <Link to = "/play" className = "btn btn-secondary" key = {1}>Play</Link>
            <Link to = "/test" className = "btn btn-secondary" key = {2}>Test</Link>
            <Link to = "/settings" className = "btn btn-secondary" key = {3}>Settings</Link>
            <Link to = "/history" className = "btn btn-secondary" key = {4}>History</Link>
          </div>

        </center>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message,
           user: state.auth.user
         };
}

export default connect(mapStateToProps, actions)(MainMenu);
