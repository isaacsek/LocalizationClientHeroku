import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import moment from "moment";
import Sound from "../classes/sound";
import TestObject from "../classes/testObject";
import json2csv from "json2csv";

var sounds = new Sound();

class EvalConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {trials:10, password:""};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
  }

  updateTrials(n) {
    if(n < 5) {
      alert("Test cannot be less than 5 trials.");
      this.setState({trials:10});
    } else {
      this.setState({trials:n});
    }
  }

  updatePassword(n) {
    //console.log(n);
    this.setState({password:n});
  }

  downloadCSV() {
    var history = this.props.user.history;
    var fields =  ["testNumber",
                "maxTrials",
                "duration",
                "startTime",
                "practice",
                "endTime",
                "totalCorrect",
                "trialCount",
                "leftCorrect",
                "rightCorrect",
                "leftSpeakerPlay",
                "rightSpeakerPlay",
                "avgReactionTime",
                "timeLeft",
                "totalReaction",
                "completed"]
    var csv = json2csv({ data: history, fields: fields });
    csv = 'data:text/csv;charset=utf-8,' + csv;
    var data = encodeURI(csv);
    return data;
  }

  render() {
    return (
      <div>

        <div className = "text-md-center mt-2">
          <h2 className = "">Configuration</h2>
          <div>Place <span style = {{color:"blue"}}>BLUE</span> on your left, and <span style = {{color:"red"}}>RED</span> on your right</div>
          {/*<a href = {this.downloadCSV()} download = "exports.csv">Download</a>*/}


          <div className = "">
            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-primary" src="images/blueSpeaker.png" height="150px" width="150px"
                onClick = {() => {sounds.setSide("left"); sounds.play();}}/>
              <figcaption>Left Speaker</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary ml-1 mr-1" src="images/userIcon.png" height="200px" width="200px"
                onClick = {() => {console.log("Hello, world!")}}/>
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img disabled = "true" className = "btn btn-secondary btn-lg btn-outline-danger" src="/static/images/redSpeaker.png" height="150px" width="150px"
                onClick = {() => {sounds.setSide("right"); sounds.play();}}/>
              <figcaption>Right Speaker</figcaption>
            </figure>
          </div>

          <div className = ""><h5>Click on icons to test speakers. When you are ready, click start.</h5></div>

          <div className = "mt-2">Number of Trials? <input style = {{width:"50px"}} type = "number" value = {this.state.trials}
            onChange = {(event) => {this.updateTrials(event.target.value)}}></input>
          </div>

          <div className = "">Password? <input style = {{align:"left", width:"100px"}} type = "text" value = {this.state.password}
            onChange = {(event) => {this.updatePassword(event.target.value)}}></input>
          </div>

          <button onClick = {this.props.startTest.bind(this, this.state.trials, this.state.password)} className = "btn btn-primary btn-lg mt-1">Start</button>
          <div><Link to = "/mainmenu" className = "mt-1 btn btn-secondary btn-danger">Back to Main Menu</Link></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    speakers: state.auth.mediaDevices,
    activeTest: state.activeTest
  };
}

export default connect(mapStateToProps, actions)(EvalConfig);
