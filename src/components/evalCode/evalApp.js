import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import Moment from "moment";
import Sound from "../classes/sound";
import Test from "../classes/testObject";
import EvalConfig from "./evalConfig";
import EvalResults from "./evalResults";
import EvalInProgress from "./evalInProgress";

class EvalApp extends Component {
  constructor(props) {
    super(props);
    this.state = {testInProgress:false, evaluation:{}};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
  }

  renderView() {
    if(this.props.user == undefined) {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }

    if(this.state.testInProgress == false) {
      return <EvalConfig evaluation = {this.state.evaluation} startTest = {(numTrials, password) => this.startTest(numTrials, password)}/>;
    } else if (this.state.testInProgress == true) {
        return <EvalInProgress evaluation = {this.state.evaluation} updateEval = {(test) => this.updateEval(test)} endTest = {() => this.endTest()}/>;
    } else {
      return <EvalResults evaluation = {this.state.evaluation} playAgain = {() => this.setState({testInProgress:false})}/>;
    }
  }

  updateEval(evaluation) {
    this.setState({evalatuion:evaluation});
  }

  startTest(trials, password) {
    //console.log(password);
    if(password == "pass") {
      var newTest = new Test(this.props.user.testCount + 1, trials, 0, new Moment(), false)
      this.setState({testInProgress:true, evaluation:newTest});
    } else {
      alert("Incorrect password. Try again.");
    }
  }

  endTest() {
    this.setState({testInProgress:"Over"});
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.auth.user,
      speakers: state.auth.mediaDevices,
      activeTest: state.activeTest.activeTest
    };
}

export default connect(mapStateToProps, actions)(EvalApp);
