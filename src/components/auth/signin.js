import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ username, password }) {
    // Need to do something to log user in
    this.props.signinUser({ username, password });
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
    const { handleSubmit, fields: { username, password }} = this.props;

    return (
      <center>
      <h2 className = "m-t-2">iLocalize</h2>
      <div className = "container2">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group m-t-2">
            {/*}<label style = {{}}>Username</label>*/}
            <input {...username} className="form-control" placeholder = "Username"/>
          </fieldset>
          <fieldset className="form-group">
            {/*}<label style = {{}}>Password</label>*/}
            <input {...password} type="password" className="form-control" placeholder = "Password" align = "right" style = {{align:"right"}}/>
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary m-t-1" style = {{width:"250px"}}>Login</button>
        </form>
      </div>
      </center>

    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);
