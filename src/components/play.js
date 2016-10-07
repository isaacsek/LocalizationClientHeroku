import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import promiseMiddleware from 'redux-promise';
import axios from 'axios';




const MAX_TRIALS = 10;
var speakers = [];
var whereLongSound = new Audio("/audio/whereLong.wav");
var speakerPlayingSound = pickRandomSpeaker;//Math.round(Math.random()); //defaults to random
var userGuess = 0, correctCount = 0, trialCount = 1, startTime,
endTime, rightCorrect = 0, leftCorrect = 0, rightSpeakerPlay = 0,
leftSpeakerPlay = 0, timeElapsed = 0;
var resultString = "Choose Left or Right";

var redSpeakerSink = null;
var blueSpeakerSink = null;

function pickRandomSpeaker() {
  var random = getRandomInt(1,2);
  //console.log(random);
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

// Returns a random integer between min (included) and max (included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function attachSinkId(element, sinkId, speakerName)
{
    if (typeof element.sinkId !== 'undefined')
    {
        element.setSinkId(sinkId).then(function()
        {
            console.log('Success, audio output device attached: ' + speakerName);
        }).catch(function(error)
        {
            var errorMessage = error;
            if (error.name === 'SecurityError')
            {
              errorMessage = 'You need to use HTTPS for selecting audio output ' +
                  'device: ' + error;
            }
            console.error(errorMessage);
            speakerPlayingSound = "red";
            attachSinkId(whereLongSound, redSpeakerSink, "red speaker");
        });
    } else
    {
        console.warn('Browser does not support output device selection.');
    }
}

class Play extends Component {
  constructor(props) {
    super(props);
    //this.renderMediaDevices();
    this.state = {startGame:false, speakersLoaded:false, redSpeakerSink: null, blueSpeakerSink: null, resultString: "none"};
    this.nextTrial = this.nextTrial.bind(this);
    this.leftNextTrial = this.leftNextTrial.bind(this);
    this.rightNextTrial = this.rightNextTrial.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);

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

  nextTrial() {
    this.setState({trial: this.state.trial + 1});
    if(trialCount <= MAX_TRIALS) {
      trialCount++;
    } else {
      this.endGame();
    }
  }
  // red = left
  leftNextTrial() {
    this.forceUpdate();
    this.determineGuess("red");
    if(trialCount <= MAX_TRIALS) {
      trialCount++;
      console.log(trialCount);
    } else {
      alert("End of test");
      this.endGame();
      this.saveTestResults();
    }
    speakerPlayingSound = pickRandomSpeaker();
    this.forceUpdate();
  }
  // blue = right
  rightNextTrial() {
    this.forceUpdate();
    this.determineGuess("blue");
    if(trialCount <= MAX_TRIALS) {
      trialCount++;
      console.log(trialCount);
    } else {
      alert("End of test");
      this.endGame();
      this.saveTestResults();
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
        resultString = "You chose the correct speaker!";
    } else {
        console.log("incorrect guess!");
        resultString = "You chose the incorrect speaker :( Try again!"
    }
  }

  renderGame() {
    if(this.state.startGame == true) {
      return (
        <div id = "gameContainer" className = "container m-t-2">
            <div className = "row">Test: {this.props.user.testCount + 1}</div>
            <div className = "row">Trial: {trialCount}</div>
            <div className = "row">Correct Guesses: {correctCount}</div>
            <div className = "row"><button onClick = {this.playSound} className = "btn btn-secondary">Play Sound</button></div>
            <div className = "row">
                <button onClick = {this.leftNextTrial} className = "btn btn-secondary">Left</button>
                <button onClick = {this.rightNextTrial} className = "btn btn-secondary">Right</button>
            </div>
            <div className = "row"><button onClick={this.nextTrial} className = "btn btn-secondary">Next Trial</button></div>
            <div className = "row">Results:{resultString}</div>
        </div>
      );
    } else if (this.state.redSpeakerSink == null || this.state.blueSpeakerSink == null) {
        return <div>Loading...</div>
    } else {
      return (
        <div><button onClick = {this.startGame} className = "btn btn-secondary">Start</button></div>
      );
    }
  }

  startGame() {
    startTime = new Date();
    this.setState({startGame:true});
  }

  endGame() {
    endTime = new Date();
    this.setState({startGame:false});
  }

  renderUser()
  {
    if(this.props.user === undefined)
    {
      return (
        <div>Loading...</div>
      );
    }
    else
    {
      return (
        <div>Speakers Succesfully loaded. Place RED on your left, and BLUE on your right {this.props.user.username}</div>
      );
    }
  }

  saveTestResults()
  {
    var testing = {};
    //console.log("pre: " + JSON.stringify(this.props.user));

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
    console.log(testing);
    const config = {
      headers: {
        authorization: localStorage.getItem('token')
      }
    };

    axios.post("http://localhost:3090/savetest", testing, config);
    //this.props.fetchUser();
    //console.log("user2: " + this.props.user);
    resetTest();
    //console.log("post: " + JSON.stringify(this.props.user));
    this.props.fetchUser();


  }

  render() {
    return (
      <center>
      {this.renderUser()}
        <h3 className = "text-md-center m-t-2">Play Mode</h3>
        {this.renderGame()}

        <Link to = "/mainmenu" className = "btn btn-secondary m-t-2">Back to Main Menu</Link>
      </center>
    );
  }
}



function resetTest()
{
  //testNumber++;
  rightCorrect = 0;
  leftCorrect = 0;
  rightSpeakerPlay = 0;
  leftSpeakerPlay = 0;
  timeElapsed = 0;
  trialCount = 1;
  correctCount = 0;
}

function mapStateToProps(state) {
  return { message: state.auth.message,
           user: state.auth.user,
           speakers: state.auth.mediaDevices
         };
}

export default connect(mapStateToProps, actions)(Play);
