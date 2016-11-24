import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../../actions/types"
import * as actions from '../../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import Moment from "moment";
import TestObject from "../classes/testObject";
import Sound from "../classes/sound";

class EvalResults extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
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
            <strong>Test #</strong> {this.props.evaluation.testNumber}
          </div>
            <div>
              <strong>Started:</strong> {Moment(this.props.evaluation.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div>
              <strong>Finished:</strong> {Moment(this.props.evaluation.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div>
            <div>
              <strong>Practice Duration:</strong> {(this.props.evaluation.endTime.unix() - this.props.evaluation.startTime.unix())} seconds
            </div>
            <div>
              <strong>Total Trials:</strong> {this.props.evaluation.trialCount}
            </div>
            <div>
              <strong>Total Correct:</strong> {this.props.evaluation.totalCorrect}
            </div>
            <div>
              <span style = {{color:"red"}}><strong>Left Speaker Correct:</strong> {this.props.evaluation.leftCorrect}/{this.props.evaluation.leftSpeakerPlay}</span>
            </div>
            <div>
              <span style = {{color:"blue"}}><strong>Right Speaker Correct:</strong> {this.props.evaluation.rightCorrect}/{this.props.evaluation.rightSpeakerPlay}</span>
            </div>
            <div>
              <strong>Average Reaction:</strong> {(this.props.evaluation.totalReaction / this.props.evaluation.trialCount).toFixed(3)} seconds
            </div>
          </div>

          {/*}<div><button onClick = {() => this.playAgain()} className = "btn btn-success m-t-2">Play again</button></div>*/}
          <div><Link to = "/mainmenu" className = "btn btn-danger m-t-2">Main Menu</Link></div>
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

export default connect(mapStateToProps, actions)(EvalResults);
