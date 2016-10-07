import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

class Settings extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.saveSettings(formProps);
    console.log("sumbit settings, make action");
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

  render() {
    const { handleSubmit, fields: { name, password, passwordConfirm, age, hearingDevice, deviceSide }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Name:</label>
          <input className="form-control" {...name} />
          {name.touched && name.error && <div className="error">{name.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input className="form-control" placeholder = "password" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input className="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Age:</label>
          <input className="form-control" {...age} />
          {age.touched && age.error && <div className="error">{age.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Type of hearing device:</label>
          <input className="form-control" {...hearingDevice} />
          {hearingDevice.touched && hearingDevice.error && <div className="error">{hearingDevice.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Side device is on:</label>
          <input className="form-control" {...deviceSide} />
          {deviceSide.touched && deviceSide.error && <div className="error">{deviceSide.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary left">Change Settings</button>
        <span><Link id = "left" to = "/mainmenu" className = "btn btn-danger">Cancel</Link></span>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = 'Please enter an username';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  if (!formProps.age) {
    errors.age = 'Please enter an age';
  }

  if (!formProps.hearingDevice) {
    errors.hearingDevice = 'Please enter a hearing device';
  }

  if (!formProps.deviceSide) {
    errors.deviceSide = 'Please enter side of device';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    user: state.auth.user,
    initialValues: {
      name: state.auth.user.settings.name,
      password: state.auth.user.password,
      passwordConfirm: state.auth.user.password,
      age: state.auth.user.settings.age,
      hearingDevice: state.auth.user.settings.hearingDevice,
      deviceSide: state.auth.user.settings.deviceSide
    }

  };
}

export default reduxForm({
  form: 'settings',
  fields: ['name', 'password', 'passwordConfirm', 'age', 'hearingDevice', 'deviceSide'],
  validate
}, mapStateToProps, actions)(Settings);
