import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../../actions/types"
import * as actions from '../../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import Moment from "moment";
import TestObject from "./testObject";
import Sound from "./sound";
import Test from "./testObject"
import Clocl from "./clock";
import TestConfig from "./testConfig";
import TestResults from "./testResults";
import TestInProgress from "./testInProgress";

class TestingMode extends Component {
  constructor(props) {
    super(props);
    this.state = {testInProgress:false, testCompleted: false};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    this.props.fetchActiveTest();

    this.checkTest();
  }

  checkTest() {
    if(localStorage.getItem("activeTest") != null) {
      this.setState({testInProgress:true});

      if(JSON.parse(localStorage.getItem("activeTest")).completed == true) {
        this.setState({testInProgress:"Over"});
      }
    }
  }

  componentWillUnmount() {

  }

  renderView() {
    if(this.props.user == undefined || this.props.activeTest === undefined) {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }

    if(this.state.testInProgress == false) {
      return <TestConfig startTest = {(numTrials) => this.startTest(numTrials)}/>;
    } else if (this.state.testInProgress == true) {
        return <TestInProgress endTest = {() => this.endTest()}/>;
    } else {
      return <TestResults playAgain = {() => this.setState({testInProgress:false})}/>;
    }
  }

  startTest(duration) {
    var newTest = new Test(this.props.user.testCount + 1, 0, Moment(), duration, true)
    this.props.startNewTest(newTest);
    this.setState({testInProgress:true});
  }

  endTest() {
    this.setState({testInProgress: "Over"})
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

export default connect(mapStateToProps, actions)(TestingMode);
