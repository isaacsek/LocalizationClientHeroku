import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../../actions/types"
import * as actions from '../../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import Moment from "moment";
import "moment-duration-format";
import Sound from "../classes/sound";
import TestObject from "../classes/testObject";

var resultString = "Good luck!";
var startReaction;
var sounds = new Sound();

class EvalInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {startGame:false, correctGuess:null, speakerPlayingSound:null};
  }

  componentWillMount() {
    this.setState({speakerPlayingSound:sounds.pickRandomSide()})
  }

  componentWillUnmount() {
    //console.log("dismounting");
  }

  saveTestResults(completedTest) {
    completedTest.completed = true;
    completedTest.startTime = new Moment(completedTest.startTime);
    completedTest.endTime = new Moment();
    completedTest.avgReactionTime = completedTest.totalReaction / completedTest.trialCount;
    this.props.saveEvalToDB(completedTest);
  }

  renderResultString() {
    if(this.state.correctGuess == false) {
      return (<div className = "btn btn-danger">{resultString}</div>);
    }
    else if(this.state.correctGuess == true) {
      return (<div className = "btn btn-success">{resultString}</div>);
    }
    else {
      return (<div className = "btn btn-info">{resultString}</div>);
    }
  }

  playSound() {
    startReaction = Moment();
    sounds.play();
    $("#playSound").addClass("disabledbutton");

    setTimeout(() => {
      $("#redButton").removeClass("disabledbutton");
      $("#blueButton").removeClass("disabledbutton");
    }, 1000)
  }

  determineGuess(userGuess) {

    var temp = this.props.evaluation;
    var reactionTime = Moment.duration(Moment().diff(startReaction)).asSeconds();
    temp.totalReaction = (temp.totalReaction + reactionTime);
    $("#redButton").addClass("disabledbutton");
    $("#blueButton").addClass("disabledbutton");
    $("#playSound").addClass("disabledbutton");

    if(this.state.speakerPlayingSound == "blue") {
        temp.leftSpeakerPlay++;
    } else {
        temp.rightSpeakerPlay++;
    }

    if(userGuess == this.state.speakerPlayingSound) {
        temp.totalCorrect = temp.totalCorrect + 1;

        if(this.state.speakerPlayingSound == "blue") {
            temp.leftCorrect++;
        } else {
            temp.rightCorrect++;
        }
    }
    $("#playSound").removeClass("disabledbutton");
    temp.trialCount = temp.trialCount + 1;

     if(temp.trialCount > temp.maxTrials) {
        $("#playSound").addClass("disabledbutton");
        setTimeout(() => {
          alert("Test is over!");
          this.setState({gameOver:true});
          temp.endTime = new Moment();
          temp.trialCount = temp.trialCount - 1;
          temp.avgReactionTime = temp.totalReaction / temp.trialCount;
          this.props.updateEval(temp);
          this.saveTestResults(temp);
          //this.props.saveEvalToDB(temp);
          this.props.endTest();
        }, 2000)
    } else {
      // change sound and side
      this.setState({speakerPlayingSound: sounds.pickRandomSide()});
      this.props.updateEval(temp);
      this.forceUpdate();
    }
  }

  endTest() {

  }

  renderTest() {
    return (
      <div className = "mt-2">
        <div className = ""><h3>Trial: {this.props.evaluation.trialCount}/{this.props.evaluation.maxTrials}</h3></div>
        {this.renderResultString()}
        <div className = "mt-1">
          <figure style = {{display:"inline-block"}}>
            <img id = "blueButton" className = "disabledbutton btn btn-secondary btn-lg btn-outline-primary" src="images/blueSpeaker.png" height="150px" width="150px"
              value = "blue" onClick = {this.determineGuess.bind(this,"blue")}/>
            <figcaption>Left Speaker</figcaption>
          </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary ml-1 mr-1" src="images/userIcon.png" height="200px" width="200px" />
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img id = "redButton" className = "disabledbutton btn btn-secondary btn-lg btn-outline-danger" src="/static/images/redSpeaker.png" height="150px" width="150px"
                value = "red" onClick = {this.determineGuess.bind(this,"red")}/>
              <figcaption>Right Speaker</figcaption>
            </figure>
        </div>
        <div id = "playSound" className = ""><button onClick = {this.playSound.bind(this)} className = "btn btn-lg btn-primary">Play Sound</button></div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className = "text-md-center mt-2">
          {/*}<h2 className = "text-md-center">Practice Time Remaining: <span style = {{color:"red"}}>{Moment.duration(this.props.activeTest.timeLeft, "seconds").format("mm:ss")}</span></h2>*/}
          {this.renderTest()}
          <Link to = "/mainmenu" className = "btn btn-danger mt-2">Quit</Link>
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

export default connect(mapStateToProps, actions)(EvalInProgress);
