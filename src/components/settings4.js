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

        <div className = "container m-t-2" style = {{}}>

            <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="form-group row">
              <label for = "nameInput" className="col-sm-2 col-form-label">Name:</label>
              <div className="col-sm-10">
                <input type="username" className="form-control" placeholder="Name" id = "nameInput" style = {{width:"100px"}}{...name}/>
              </div>
            </div>
            <div className="form-group row">
              <label for = "pw" className="col-sm-2 col-form-label">Password:</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" placeholder="Password" id = "pw" style = {{width:"100px"}} {...password}/>
              </div>
            </div>

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
