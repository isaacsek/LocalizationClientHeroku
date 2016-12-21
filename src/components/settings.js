import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

class Settings extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.saveSettings(formProps);
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
    const { handleSubmit, fields: { name, age, hearingDevice, deviceSide }} = this.props;
    if (this.props.user != undefined) {
      return (

        <div className = "container mt-2" style = {{width:"300px"}}>
          <h2 className = "text-md-center">Settings</h2>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <fieldset className="form-group">
              <label className = "">Name:</label>
              <input className="form-control" placeholder = "Name" {...name} type="text" />
              {name.touched && name.error && <div className="error">{name.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Age:</label>
              <input type = "number" placeholder = "Age" className="form-control" {...age} />
              {age.touched && age.error && <div className="error">{age.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Type of hearing device:</label>
              <input className="form-control" placeholder = "Type of Hearing Device" {...hearingDevice} />
              {hearingDevice.touched && hearingDevice.error && <div className="error">{hearingDevice.error}</div>}
            </fieldset>
            <fieldset className="form-group">
              <label>Side device is on:</label>
              <input className="form-control" placeholder = "Device Side" {...deviceSide} />
              {deviceSide.touched && deviceSide.error && <div className="error">{deviceSide.error}</div>}
            </fieldset>
            {this.renderAlert()}
            <center>
              <button action="submit" className="btn btn-primary left">Submit</button>
              <span className = "ml-1"><Link to = "/mainmenu" className = "btn btn-danger">Cancel</Link></span>
              <div className = "mt-1">
                <Link to = "/changepassword" className = "btn btn-warning">Change Password</Link>
              </div>
            </center>
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

  if (!formProps.name) {
    errors.name = 'Please enter your name';
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
  if (state.auth.user === undefined || state.auth.user.settings === undefined) {
    return;
  } else {
    return {
        errorMessage: state.auth.error,
        user: state.auth.user,
        initialValues: {
          name: state.auth.user.settings.name,
          age: state.auth.user.settings.age,
          hearingDevice: state.auth.user.settings.hearingDevice,
          deviceSide: state.auth.user.settings.deviceSide
        }
    };
  }
}

export default reduxForm({
  form: 'settings',
  fields: ['name','age', 'hearingDevice', 'deviceSide'],
  validate
}, mapStateToProps, actions)(Settings);
