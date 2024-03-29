import promiseMiddleware from 'redux-promise';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../actions/types"
import * as actions from '../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import moment from "moment";

const MAX_TRIALS = 10;
var speakers = [];
var whereLongSound = new Audio("/audio/whereLong.wav");
var correctSound = new Audio("/audio/correctSound.mp3");
var incorrectSound = new Audio("/audio/incorrectSound.mp3");
var speakerPlayingSound = pickRandomSpeaker;
var correctCount = 0, trialCount = 1, startTime, endTime, rightCorrect = 0, leftCorrect = 0, rightSpeakerPlay = 0, leftSpeakerPlay = 0, timeElapsed = 0;

var resultString = "Good Luck!";

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createMediaElementSource(whereLongSound);
var panNode = audioCtx.createStereoPanner();
source.connect(panNode);
panNode.connect(audioCtx.destination);
var startReaction, endReaction, totalReaction = 0;

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false, gameOver:false, speakersLoaded:false, redSpeakerSink: null, blueSpeakerSink: null, test:{},
      resultString: "none", correctGuess:null, didUserGuess: false, userGuess: null, userGuessedAlready: false, trials:10};
  }

  // Left speaker on red, blue speaker on right
  componentWillMount() {
    //this.props.fetchMessage();
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    speakerPlayingSound = pickRandomSpeaker();
    this.resetTest();
  }

  playSound() {
    startReaction = new Date();
    whereLongSound.play();
    $("#playSound").addClass("disabledbutton");
    $("#redButton").removeClass("disabledbutton");
    $("#blueButton").removeClass("disabledbutton");
  }

  nextTrial() {
    //this.determineGuess(guess);
    //$("#redButton").addClass("disabledbutton");
    //$("#blueButton").addClass("disabledbutton");
    $("#playSound").removeClass("disabledbutton");
    //if(trialCount <= this.state.trials) {
      trialCount++;
    //}

     if(trialCount > this.state.trials) {
        $("#playSound").addClass("disabledbutton");
        setTimeout(() => {
          alert("Test is over!");
          this.setState({gameOver:true});
          endTime = new Date();
          this.setState({test:this.saveTestResults()})
          //this.saveTestResults();
          //this.resetTest();
          //this.setState({startGame:false});
          //this.props.fetchUser();
          //browserHistory.push('/mainmenu');
        }, 2000)
    } else {
      speakerPlayingSound = pickRandomSpeaker();
      //this.renderResultString();
      this.forceUpdate();
      $("#nextTrial").addClass("disabledbutton");
    }
  }

  determineGuess(userGuess) {
    console.log("guess " + this.state.activeTest);
    endReaction = new Date();
    var reactionTime = (endReaction.getTime() - startReaction.getTime()) / 1000;
    totalReaction += reactionTime;
    console.log("reactionTime = " + reactionTime);
    $("#redButton").addClass("disabledbutton");
    $("#blueButton").addClass("disabledbutton");
    $("#playSound").addClass("disabledbutton");
    $("#nextTrial").removeClass("disabledbutton");
    //$("#nextTrial").prop("disabled",true);
    if(speakerPlayingSound == "blue") {
        leftSpeakerPlay++;
    } else {
        rightSpeakerPlay++;
    }
    if(userGuess == speakerPlayingSound) {
        correctCount++
        if(speakerPlayingSound == "blue") {
            leftCorrect++;
        } else {
            rightCorrect++;
        }
        //this.setState({correctGuess:true});
        //correctSound.play();
        //console.log("correct guess!");
        //resultString = "Correct! You chose the correct speaker";
    } else {
        //this.setState({correctGuess:false});
        //incorrectSound.play();
        //console.log("incorrect guess!");
        //resultString = "Incorrect! You chose the wrong speaker."
    }
    this.nextTrial();
  }

  saveTestResults() {
    var testing = {};
    testing.testNumber = this.props.user.testCount + 1;
    this.props.user.testCount++;
    testing.startTime = dateFormat(startTime, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    testing.endTime = dateFormat(endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    testing.totalCorrect = correctCount;
    testing.trialCount = 0;
    testing.leftCorrect = leftCorrect;
    testing.rightCorrect = rightCorrect;
    testing.leftSpeakerPlay = leftSpeakerPlay;
    testing.rightSpeakerPlay = rightSpeakerPlay;
    testing.duration = (endTime.getTime() - startTime.getTime()) / 1000;
    testing.practice = false;
    testing.maxTrials = this.state.trials;
    testing.timeLeft = 0;
    testing.avgReaction = Math.round((totalReaction / this.state.trials) * 100) / 100;
    console.log("Test Results: " + testing);

    const config = { headers: { authorization: localStorage.getItem('token')}};
    axios.post(ROOT_URL + "/savetest", testing, config);
    return testing;
  }
// update test results, this.props.updateActiveTest(test)
  resetTest() {
    rightCorrect = 0;
    leftCorrect = 0;
    rightSpeakerPlay = 0;
    leftSpeakerPlay = 0;
    timeElapsed = 0;
    trialCount = 1;
    correctCount = 0;
    resultString = "Choose left or right";
    totalReaction = 0;
  }

  renderUser() {
    if(this.props.user === undefined) {
      return  (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
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

  updateTrials(n) {
    if(n < 1) {
      alert("Cannot be less than 1 trial");
      this.setState({trials:10});
    } else {
      this.setState({trials:n});
    }
  }

  renderResults() {
    if(this.state.gameOver == true) {
      return (
        <div className = "test-md-center m-t-2">
          <div><h2 className = "text-left text-md-center">Results:</h2></div>


          <div className = "text-left m-t-1" id = "testView">
            <div>
              <strong>Started:</strong> {this.state.test.startTime}
            </div>
            <div>
              <strong>Duration:</strong> {this.state.test.timeElapsed} seconds
            </div>
            <div>
              <strong>Average Reaction:</strong> {this.state.test.avgReaction} seconds
            </div>
            <div>
              <strong>Total Trials:</strong> {this.state.test.maxTrials}
            </div>
            <div>
              <strong>Total Correct:</strong> {this.state.test.totalCorrect}
            </div>
            <div>
              <span style = {{color:"red"}}><strong>Left Speaker Correct:</strong> {this.state.test.leftCorrect}/{this.state.test.leftSpeakerPlay}</span>
            </div>
            <div>
              <span style = {{color:"blue"}}><strong>Right Speaker Correct:</strong> {this.state.test.rightCorrect}/{this.state.test.rightSpeakerPlay}</span>
            </div>
          </div>


            <div className = "text-left">
                <Link to = "playpanner" className = "btn btn-secondary btn-success m-t-2" onClick = {() => {
                  this.resetTest();
                  this.setState({startGame:false, gameOver:false});
                  this.props.fetchUser()
                }}>Play Again</Link>

                <span className = "m-l-2">
                  <Link to = "/mainmenu" className = "btn btn-secondary btn-danger m-t-2" onClick = {() => {
                    this.resetTest();
                    this.setState({startGame:false, gameOver:false});
                    this.props.fetchUser();
                    browserHistory.push('/mainmenu');
                  }}>Quit</Link>
                </span>
            </div>
        </div>
      );
    }
  }

  renderGame() {
    if(this.state.startGame == true && this.state.gameOver == false) {

      return (
        <div className = "m-t-2">
          <div className = ""><h3>Trial: {trialCount}/{this.state.trials}</h3></div>

          {this.renderResultString()}
          <div className = "m-t-1">

          <figure style = {{display:"inline-block"}}>
            <img id = "blueButton" className = "disabledbutton btn btn-secondary btn-lg btn-outline-primary" src="images/blueSpeaker.png" height="150px" width="150px"
              value = "blue" onClick = {this.determineGuess.bind(this,"blue")}/>
            <figcaption>Left Speaker</figcaption>
          </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary m-l-1 m-r-1" src="images/userIcon.png" height="200px" width="200px" />
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img id = "redButton" className = "disabledbutton btn btn-secondary btn-lg btn-outline-danger" src="/static/images/redSpeaker.png" height="150px" width="150px"
                value = "red" onClick = {this.determineGuess.bind(this,"red")}/>
              <figcaption>Right Speaker</figcaption>
            </figure>



          </div>
          <div id = "playSound" className = ""><button onClick = {this.playSound.bind(this)} className = "btn btn-lg btn-primary">Play Sound</button></div>
          {/*}<div><button id = "nextTrial" onClick={this.nextTrial.bind(this)} className = "disabledbutton m-t-2 btn btn-outline-primary">Next Trial</button></div>*/}

          {/*}<div><Link to = "/mainmenu" className = "btn btn-secondary m-t-2 btn-danger">Quit Test</Link></div>*/}

        </div>
      );
    } else if(this.state.startGame == false && this.state.gameOver == false){
      return (
        <div className = "m-t-2">
          <h2 className = "text-md-center m-t-2">Evaluation</h2>
          <div>
            Place <span style = {{color:"blue"}}>BLUE</span> on your left, and <span style = {{color:"red"}}>RED</span> on your right
          </div>
          <div className = "m-t-2">
            Number of Trials? <input style = {{width:"50px"}} type = "number" value = {this.state.trials} onChange = {(event) => {this.updateTrials(event.target.value)}}></input>
          </div>
          <div className = "m-t-2">

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-primary" src="images/blueSpeaker.png" height="150px" width="150px"
                onClick = {this.testSpeaker.bind(this, "blue")}/>
              <figcaption>Left Speaker</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary m-l-1 m-r-1" src="images/userIcon.png" height="200px" width="200px"
                onClick = {() => {console.log("Hello, world!")}}/>
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img disabled = "true" className = "btn btn-secondary btn-lg btn-outline-danger" src="/static/images/redSpeaker.png" height="150px" width="150px"
                onClick = {this.testSpeaker.bind(this, "red")}/>
              <figcaption>Right Speaker</figcaption>
            </figure>
          </div>
          <div className = "m-t-2"><h5>Click on icons to test speakers. When you are ready, click start.</h5></div>
          <button onClick = {() => {

            pickRandomSpeaker();
            startTime = new Date();
            this.setState({startGame:true});
          }}
          className = "btn btn-primary btn-lg m-t-2">Start</button>

          <div><Link to = "/mainmenu" className = "btn btn-secondary btn-danger m-t-2">Back to Main Menu</Link></div>
        </div>
      );
    }
  }

  testSpeaker(speaker) {
    console.log(speaker)
    if(speaker == "blue") {
      panNode.pan.value = -1;
    }
    if (speaker == "red") {
      panNode.pan.value = 1;
    }
    this.playSound();
  }

  render() {
    return (
      <center>
        {this.renderGame()}
        {this.renderResults()}
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
  var random = getRandomInt(1, 2);
  if(random == 1) {
    //console.log("red/left");
    speakerPlayingSound = "blue";
    panNode.pan.value = -1;
    return "blue";
  } else {
    //console.log("blue/right");
    speakerPlayingSound = "red";
    panNode.pan.value = 1;
    return "red";
  }
}

function mapStateToProps(state) {
  return {
    //message: state.auth.message,
    user: state.auth.user,
    speakers: state.auth.mediaDevices,
    activeTest: state.auth.activeTest
  };
}

export default connect(mapStateToProps, actions)(Play);
