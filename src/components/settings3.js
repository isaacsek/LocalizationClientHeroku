import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

class Settings extends Component {
  componentWillMount() {
    //this.props.fetchUser();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.saveSettings(formProps);
    console.log("sumbit settings, make action");
  }

  loadUser() {
    if (this.props.user != null){
      return;
    } else {
      return;
    }
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
    const { handleSubmit, fields: { name, password, passwordConfirm, age, hearingDevice, deviceSide }} = this.props;
    if (this.props.user != undefined) {
      return (

        <div className = "container-fluid m-t-2" style = {{}}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>


        <div class="form-group row">
          <label for="nameInput" className="col-md-4 col-form-label">Name:</label>
          <div class ="">
              <input className ="col-md-4" type="text" id="nameInput" {...name}></input>
              {name.touched && name.error && <div className="error">{name.error}</div>}
          </div>
        </div>

        <div class="form-group row">
          <label for="passwordInput" className="col-md-4 col-form-label">Password:</label>
          <div className ="">
              <input class="col-md-4" type="password" id="passwordInput" {...password}></input>
              {password.touched && password.error && <div className="error">{password.error}</div>}
          </div>
        </div>

        <div class="form-group row">
          <label for="confirmInput" className="col-sm-2 col-form-label">Password:</label>
          <div class ="">
              <input class="form-control" type="password" id="confirmInput" {...passwordConfirm}></input>
              {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
          </div>
        </div>

        <div class="form-group row">
          <label for="ageInput" className="col-sm-2 col-form-label">Password:</label>
          <div class ="">
              <input class="form-control" type="number" id="ageInput" {...age}></input>
              {age.touched && age.error && <div className="error">{age.error}</div>}
          </div>
        </div>

        <div class="form-group row">
          <label for="deviceInput" className="col-sm-2 col-form-label">Password:</label>
          <div class ="">
              <input class="form-control" type="text" id="deviceInput" {...hearingDevice}></input>
              {hearingDevice.touched && hearingDevice.error && <div className="error">{hearingDevice.error}</div>}
          </div>
        </div>

        <div class="form-group row">
          <label for="deviceSideInput" className="col-sm-2 col-form-label">Password:</label>
          <div class ="">
              <input class="form-control" type="text" id="deviceSideInput" {...deviceSide}></input>
              {deviceSide.touched && deviceSide.error && <div className="error">{deviceSide.error}</div>}
          </div>
        </div>

          {this.renderAlert()}
          <div>
          <button action="submit" className="btn btn-primary left">Change Settings</button>
          <span><Link id = "left" to = "/mainmenu" className = "btn btn-danger">Cancel</Link></span></div>
        </form>
        </div>

      );
    } else {
      return (<div>Loading...</div>)
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

  if (!formProps.name) {
    errors.name = 'Please enter your name';
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
