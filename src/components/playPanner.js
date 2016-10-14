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

var resultString = "Choose Left or Right";

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createMediaElementSource(whereLongSound);
var panNode = audioCtx.createStereoPanner();
source.connect(panNode);
panNode.connect(audioCtx.destination);

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false, speakersLoaded:false, redSpeakerSink: null, blueSpeakerSink: null,
      resultString: "none", correctGuess:null, didUserGuess: false, userGuess: null};
  }

  // Left speaker on red, blue speaker on right
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    speakerPlayingSound = pickRandomSpeaker();
    this.resetTest();
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
    //this.renderResultString();
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
        this.setState({correctGuess:true});
        console.log("correct guess!");
        resultString = "Correct! You chose the correct speaker";
    } else {
        this.setState({correctGuess:false});
        console.log("incorrect guess!");
        resultString = "Incorrect! You chose the wrong speaker."
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
    resultString = "Choose left or right";
  }

  renderUser() {
    if(this.props.user === undefined) {
      return  (<div>Loading...</div>);
    } else {
      return;
    }
  }

  renderResultString() {
    if(this.state.correctGuess == false) {
      return (<div className = "btn btn-danger">Results: {resultString}</div>);
    }
    else if(this.state.correctGuess == true) {
      return (<div className = "btn btn-success">Results: {resultString}</div>);
    }
    else {
      return (<div className = "btn btn-info">Results: {resultString}</div>);
    }
  }

  renderGame() {
    if(this.state.startGame == true) {
      return (
        <div className = "m-t-2">
        <div className = "">
          <h3>Trial: {trialCount}/{MAX_TRIALS}</h3></div>
          {this.renderResultString()}
          <div className = "m-t-1">

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-danger" src="/images/redSpeaker.png" height="150px" width="150px"
                value = "red" onClick = {this.nextTrial.bind(this,"red")}/>
              <figcaption>Left Speaker</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary m-l-1 m-r-1" src="/images/userIcon.png" height="200px" width="200px" />
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-primary" src="/images/blueSpeaker.png" height="150px" width="150px"
                value = "blue" onClick = {this.nextTrial.bind(this,"blue")}/>
              <figcaption>Right Speaker</figcaption>
            </figure>

          </div>
          <div className = ""><button onClick = {this.playSound} className = "btn btn-lg btn-primary">Play Sound</button></div>
          <div className = "row"><button onClick={this.nextTrial} className = "m-t-2 btn btn-outline-primary">Next Trial</button></div>
          {/*}<div><Link to = "/mainmenu" className = "btn btn-secondary m-t-2 btn-danger">Quit Test</Link></div>*/}
        </div>
      );
    } else {
      return (
        <div className = "m-t-2">
          <h2 className = "text-md-center m-t-2">Play Mode</h2>
          <div>
            Place <span style = {{color:"red"}}>RED</span> on your left, and <span style = {{color:"blue"}}>BLUE</span> on your right
          </div>
          <div className = "m-t-2">
            <figure style = {{display:"inline-block"}}>
              <img disabled = "true" className = "btn btn-secondary btn-lg btn-outline-danger" src="/images/redSpeaker.png" height="150px" width="150px"
                onClick = {this.testSpeaker.bind(this, "red")}/>
              <figcaption>Left Speaker</figcaption>
            </figure>
            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary m-l-1 m-r-1" src="/images/userIcon.png" height="200px" width="200px"
                onClick = {() => {console.log("Hello, world!")}}/>
              <figcaption>You</figcaption>
            </figure>
            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-primary" src="/images/blueSpeaker.png" height="150px" width="150px"
                onClick = {this.testSpeaker.bind(this, "blue")}/>
              <figcaption>Right Speaker</figcaption>
            </figure>
          </div>
          <div className = "m-t-2"><h5>Click on icons to test speakers. When you are ready, click start.</h5></div>
          <button onClick = {() => {pickRandomSpeaker();startTime = new Date();this.setState({startGame:true});}}
          className = "btn btn-primary btn-lg m-t-2">Start</button>
          <div><Link to = "/mainmenu" className = "btn btn-secondary btn-outline-danger m-t-2">Back to Main Menu</Link></div>
        </div>
      );
    }
  }

  testSpeaker(speaker) {
    console.log(speaker)
    if(speaker == "red") {
      panNode.pan.value = -1;
    }
    if (speaker == "blue") {
      panNode.pan.value = 1;
    }
    this.playSound();
  }

  render() {
    return (
      <center>
        {this.renderUser()}
        {this.renderGame()}
      </center>
    );
  }
}

// Returns a random integer between min (included) and max (included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -1 = left/red, 1 = right/blue
function pickRandomSpeaker() {
  var random = getRandomInt(1,2);
  if(random == 1) {
    console.log("red/left");
    speakerPlayingSound = "red";
    panNode.pan.value = -1;
    return "red";
  } else {
    console.log("blue/right");
    speakerPlayingSound = "blue";
    panNode.pan.value = 1;
    return "blue";
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
