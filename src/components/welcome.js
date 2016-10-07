import React      from 'react';
import { Link }   from 'react-router'
import { connect } from 'react-redux';

class Welcome extends React.Component {

  renderLogin() {
    if(!this.props.authenticated)
    {
      return(<Link to="/signin" className="btn btn-primary btn-md" role="button">Login</Link>);
    }
  }

  render() {
    return (
      <div className="text-md-center">
        <h1 className="display-3 m-t-2">Welcome!</h1>
        <p className="lead">Improve your sound localization here.</p>
        {this.renderLogin()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

{/*export default () =>
  <div className="text-md-center">
    <h1 className="display-3 m-t-2">Welcome!</h1>
    <p className="lead">Improve your hearing here.</p>

    <Link to="/signin" className="btn btn-primary btn-md" role="button">Login</Link>
  </div>*/}

  export default connect(mapStateToProps)(Welcome);
