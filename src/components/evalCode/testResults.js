import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../../actions/types"
import * as actions from '../../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import moment from "moment";
import TestObject from "../classes/testObject";
import Sound from "../classes/sound";

class TestResults extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    this.props.fetchActiveTest();
  }

  playAgain() {
    this.props.clearTest();
    this.props.playAgain();
  }

  render() {
    return (
      <div>
        <div className = "text-md-center m-t-2">

        <div><h2 className = "text-left text-md-center">Practice Results:</h2></div>
          <div className = "text-left m-t-2" id = "testView">
          <div>
            <strong>Test #</strong> {this.props.activeTest.testNumber}
          </div>
            <div>
              <strong>Started:</strong> {this.props.activeTest.startTime}
            </div>
            <div>
              <strong>Finished:</strong> {this.props.activeTest.endTime.toString()}
            </div>
            <div>
              <strong>Practice Duration:</strong> {this.props.activeTest.duration} minutes
            </div>
            <div>
              <strong>Total Trials:</strong> {this.props.activeTest.trialCount}
            </div>
            <div>
              <strong>Total Correct:</strong> {this.props.activeTest.correctCount}
            </div>
            <div>
              <span style = {{color:"red"}}><strong>Left Speaker Correct:</strong> {this.props.activeTest.leftCorrect}/{this.props.activeTest.leftSpeakerPlay}</span>
            </div>
            <div>
              <span style = {{color:"blue"}}><strong>Right Speaker Correct:</strong> {this.props.activeTest.rightCorrect}/{this.props.activeTest.rightSpeakerPlay}</span>
            </div>
            <div>
              <strong>Average Reaction:</strong> {this.props.activeTest.avgReactionTime} seconds
            </div>
          </div>

          <div><button onClick = {() => this.playAgain()} className = "btn btn-success m-t-2">Play again</button></div>
          <div><Link to = "/mainmenu" onClick = {this.props.clearTest} className = "btn btn-danger m-t-2">Quit</Link></div>
        </div>
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

export default connect(mapStateToProps, actions)(TestResults);
