import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import Moment from "moment";

class History extends Component {
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

  renderEvals() {
    if(this.props.user != undefined) {
      //console.log(this.props.user);
      return (
            this.props.user.history.evaluations.map((test) => {
            return (

              <Link to = "/resultview"
                key = {test.testNumber}
                className = "btn btn-secondary mt-2 text-md-left" style = {{color: 'black'}}
                onClick = {() => this.props.selectTest(test)}>
                    Test #{test.testNumber}, {Moment(test.startTime).format("MMMM Do YYYY")}, <span style = {{color:"red"}}>Score: {test.totalCorrect}/{test.trialCount}</span></Link>
            );
          })
        );
    } else {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }
  }

  renderPractices() {
    if(this.props.user != undefined) {
      return (
            this.props.user.history.practices.map((test) => {
            return (

              <Link to = "/resultview"
                key = {test.testNumber}
                className = "btn btn-secondary mt-2 text-md-left" style = {{color: 'black'}}
                onClick = {() => this.props.selectTest(test)}>
                    Test #{test.testNumber}, {Moment(test.startTime).format("MMMM Do YYYY")}, <span style = {{color:"red"}}>Score: {test.totalCorrect}/{test.trialCount}</span></Link>
            );
          })
        );
    } else {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }
  }

  rendertestSelected() {
    if(!this.props.testSelected)
    {
      return <div>Select a test to get started</div>
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>
          Title: {this.props.testSelected.testNumber}
        </div>
        <div>
          Total Correct: {this.props.testSelected.totalCorrect}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className = "text-md-center">
        <h2 className = "text-md-center mt-2">History</h2>

        <div className = "">
          <div className ="btn-group-vertical btn-group-lg mr-2">
            <div className = "mt-2 btn btn-primary">Evaluations</div>
            {this.renderEvals()}
            <div className = "mt-2 btn btn-primary">Practices</div>
            {this.renderPractices()}
            <Link to = "/mainmenu" className = "btn btn-danger mt-2">Back to Main Menu</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    user: state.auth.user,
    testSelected: state.auth.testSelected
  };
}

export default connect(mapStateToProps, actions)(History);
