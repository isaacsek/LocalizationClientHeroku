import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
  }

  renderUser() {
    return (
        <ul>
          {this.props.message.map(function(userValue){
            return <li>{userValue}</li>;
          })}
        </ul>
      )
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  render() {
    return (
      <div>
        <h3 className = "text-md-center m-t-2">Feature</h3>
        <h4 className = "text-md-center text-justify m-t-2">User: {this.loadUser()}</h4>
        <h4 className = "text-md-center text-justify m-t-2">Message: {this.props.message}</h4>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Feature);
