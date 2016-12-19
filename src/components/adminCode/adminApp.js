import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import Moment from "moment";

class Admin extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  constructor(props) {
    super(props);
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  fetchDB() {
    if(this.props.user == undefined) {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className = "text-md-center">
        <h2 className = "text-md-center mt-2">Admin Page</h2>
        {this.fetchDB()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message,
           user: state.auth.user,
           testSelected: state.auth.testSelected
         };
}

export default connect(mapStateToProps, actions)(Admin);
