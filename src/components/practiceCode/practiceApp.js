import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import Moment from "moment";
import Sound from "../classes/sound";
import Test from "../classes/testObject";
import PracticeConfig from "./practiceConfig";
import PracticeResults from "./practiceResults";
import PracticeInProgress from "./practiceInProgress";

class PracticeApp extends Component {
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
    if(localStorage.getItem("activeTest") != null && localStorage.getItem("activeTest") !== "undefined") {
      this.setState({testInProgress:true});

      if(JSON.parse(localStorage.getItem("activeTest")).completed == true) {
        this.setState({testInProgress:"Over"});
      }
    }
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
      return <PracticeConfig startTest = {(numTrials) => this.startTest(numTrials)}/>;
    } else if (this.state.testInProgress == true) {
      return <PracticeInProgress endTest = {() => this.endTest()}/>;
    } else {
      return <PracticeResults playAgain = {() => this.setState({testInProgress:false})}/>;
    }
  }

  startTest(minutes) {
    var newTest = new Test(this.props.user.history.practiceCount + 1, 0, minutes, new Moment(), true)
    this.props.updateTest(newTest);

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

export default connect(mapStateToProps, actions)(PracticeApp);
