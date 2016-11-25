import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

class PasswordChange extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.savePassword(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderForm() {
    const { handleSubmit, fields: { password, passwordConfirm }} = this.props;
    if (this.props.user != undefined) {
      return (

        <div className = "container m-t-2" style = {{width:"300px"}}>
          <h2 className = "text-md-center m-t-2">Change Password</h2>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <fieldset className="form-group">
              <label className = "">Password:</label>
              <input className="form-control" placeholder = "password" {...password} type="password" />
              {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Confirm Password:</label>
              <input className="form-control" placeholder = "password confirm" {...passwordConfirm} type="password" />
              {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
            </fieldset>

            {this.renderAlert()}
            <center><button action="submit" className="btn btn-primary left">Submit</button>
            <span><Link id = "left" to = "/mainmenu" className = "btn btn-danger">Cancel</Link></span></center>
          </form>
        </div>
      );
    } else {
      return (
        <div className = "v1">
            <div className = "v2">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  if (state.auth.user === undefined || state.auth.user.settings === undefined) {
    return;
  } else {
    return {
        errorMessage: state.auth.error,
        user: state.auth.user,
    };
  }
}

export default reduxForm({
  form: 'settings',
  fields: ['password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(PasswordChange);
