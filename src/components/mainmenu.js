import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

'use strict';

class MainMenu extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
    this.props.fetchMediaDevices();
  }

  loadUser() {
    if (this.props.user != undefined){
      return <div>Hello {this.props.user.settings.name}</div>;
    } else {
      return <div>
        Loading user...
      </div>;
    }
  }

  render() {
    return (
      <div>
        <h3 className = "text-md-center m-t-2">Main Menu</h3>

        <center>
          
          <div className ="btn-group-vertical btn-group-lg m-t-1">
            <Link to = "/playpanner" className = "btn btn-secondary" key = {5}>Play</Link>
            {/*}<Link to = "/play" className = "btn btn-secondary" key = {1}>Play</Link>*/}
            {/*<Link to = "/test" className = "btn btn-secondary" key = {2}>Test</Link> */}
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
