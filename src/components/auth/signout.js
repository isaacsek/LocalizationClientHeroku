import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="text-md-center">
        <h1 className="display-5 m-t-2">Come back soon!</h1>
      </div>
    )
  }
}

export default connect(null, actions)(Signout);
