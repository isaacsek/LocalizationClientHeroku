import promiseMiddleware from 'redux-promise';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../actions/types"
import * as actions from '../actions';
import axios from 'axios';

const MAX_TRIALS = 10;
var speakers = [];
var whereLongSound = new Audio("/audio/whereLong.wav");
var speakerPlayingSound = pickRandomSpeaker;
var correctCount = 0, trialCount = 1, startTime, endTime, rightCorrect = 0, leftCorrect = 0, rightSpeakerPlay = 0, leftSpeakerPlay = 0, timeElapsed = 0;


var redSpeakerSink = null;
var blueSpeakerSink = null;
var resultString = "Choose Left or Right";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false, speakersLoaded:false, redSpeakerSink: null, blueSpeakerSink: null, resultString: "none", correctGuess:null};
  }

  // Left speaker on red, blue speaker on right
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    var self = this;
    navigator.mediaDevices.enumerateDevices().then(function(devices)
    {
        var audioOutputSelect = document.querySelector('select#audioOutput');
        devices.forEach(function(device)
        {
            if(device.kind == "audiooutput")
            {
                if(device.label.includes("red"))
                {
                  self.setState({redSpeakerSink:device.deviceId});
                  redSpeakerSink = device.deviceId;
                  speakerPlayingSound = pickRandomSpeaker();
                };
                if(device.label.includes("blue"))
                {
                  self.setState({blueSpeakerSink:device.deviceId});
                  blueSpeakerSink = device.deviceId;
                  speakerPlayingSound = pickRandomSpeaker();
                };
            };
        });
    });

  }

  playSound() {
    whereLongSound.play();
  }

  nextTrial(guess) {
    this.determineGuess(guess);

    if(trialCount < MAX_TRIALS) {
      trialCount++;
    } else {
      alert("End of test");
      endTime = new Date();
      this.setState({startGame:false});
      this.saveTestResults();
      this.resetTest();
      this.props.fetchUser();
      browserHistory.push('/mainmenu');
    }
    speakerPlayingSound = pickRandomSpeaker();
    this.forceUpdate();
  }

  determineGuess(userGuess) {
    if(speakerPlayingSound == "red") {
        leftSpeakerPlay++;
    } else {
        rightSpeakerPlay++;
    }
    if(userGuess == speakerPlayingSound) {
        correctCount++
        if(speakerPlayingSound == "red") {
            leftCorrect++;
        } else {
            rightCorrect++;
        }
        console.log("correct guess!");
        resultString = "Correct! You chose the correct speaker";
    } else {
        console.log("incorrect guess!");
        resultString = "Incorrect! You chose the wrong speaker."
    }
  }

  renderUser() {
    if(this.props.user === undefined) {
      return  (<div>Loading...</div>);
    } else {
      return (<div>Place RED on your left, and BLUE on your right</div>);
    }
  }

  saveTestResults() {
    var testing = {};
    testing.testNumber = this.props.user.testCount + 1;
    this.props.user.testCount++;
    testing.maxTrials = MAX_TRIALS;
    testing.startTime = startTime.toString();
    testing.endTime = endTime.toString();
    testing.leftCorrect = leftCorrect;
    testing.rightCorrect = rightCorrect;
    testing.leftSpeakerPlay = leftSpeakerPlay;
    testing.rightSpeakerPlay = rightSpeakerPlay;
    testing.totalCorrect = correctCount;
    testing.timeElapsed = (endTime.getTime() - startTime.getTime()) / 1000;
    console.log("Test Results: " + testing);

    const config = { headers: { authorization: localStorage.getItem('token')}};
    axios.post(ROOT_URL + "/savetest", testing, config);
  }

  resetTest() {
    rightCorrect = 0;
    leftCorrect = 0;
    rightSpeakerPlay = 0;
    leftSpeakerPlay = 0;
    timeElapsed = 0;
    trialCount = 1;
    correctCount = 0;
  }

  renderResultString(guess) {

  }

  renderGame() {
    if(this.state.startGame == true) {
      return (
        <div id = "gameContainer" className = "panel-primary m-t-2">
            <div className = "small">Test #: {this.props.user.testCount + 1}</div>
            <div className = "small">Progress: {trialCount}/{MAX_TRIALS}</div>
            <div className = "small">Correct Guesses: {correctCount}</div>
            <div className = "m-t-2"><button onClick = {this.playSound} className = "btn btn-secondary btn-outline-primary">Play Sound</button></div>
            <div className = "m-t-2">
                <button value = "red" onClick = {this.nextTrial.bind(this,"red")} className = "btn btn-secondary btn-lg btn-outline-danger">Left</button>
                <button value = "blue" onClick = {this.nextTrial.bind(this,"blue")} className = "btn btn-secondary btn-lg btn-outline-info m-l-2">Right</button>
            </div>
            {/*}<div className = "row"><button onClick={this.nextTrial} className = "btn btn-secondary">Next Trial</button></div>*/}
            <div className = "btn btn-warning m-t-2">Results: {resultString}</div>
        </div>
      );
    } else if (this.state.redSpeakerSink == null || this.state.blueSpeakerSink == null) {
        return <div>Loading... Are the RED/BLUE speakers plugged in?</div>
    } else {
      return (
        <div><button onClick = {() => {startTime = new Date();this.setState({startGame:true});}} className = "btn btn-primary btn-lg m-t-2">Start</button></div>
      );
    }
  }

  render() {
    return (
      <center>
      {this.renderUser()}
        <h3 className = "text-md-center m-t-2">Play Mode</h3>
        {this.renderGame()}
        <Link to = "/mainmenu" className = "btn btn-secondary m-t-2 btn-danger">Quit</Link>
      </center>
    );
  }
}

// Returns a random integer between min (included) and max (included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomSpeaker() {
  var random = getRandomInt(1,2);
  if(random == 1) {
    speakerPlayingSound = "red";
    attachSinkId(whereLongSound, redSpeakerSink, "red speaker");
    return "red";
  } else {
    speakerPlayingSound = "blue";
    attachSinkId(whereLongSound, blueSpeakerSink, "blue spaker");
    return "blue";
  }
}

function attachSinkId(element, sinkId, speakerName) {
    if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(sinkId).then(function() {
            console.log('Success, audio output device attached: ' + speakerName);
        }).catch(function(error) {
            var errorMessage = error;
            if (error.name === 'SecurityError') {
              errorMessage = 'You need to use HTTPS for selecting audio output ' +
                  'device: ' + error;
            }
            speakerPlayingSound = "red";
            alert("Loading...");
        });
    } else {
        console.warn('Browser does not support output device selection.');
    }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    user: state.auth.user,
    speakers: state.auth.mediaDevices
  };
}

export default connect(mapStateToProps, actions)(Play);
