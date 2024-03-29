import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import moment from "moment";
import Sound from "../classes/sound";
import TestObject from "../classes/testObject";

var sounds = new Sound();

class PracticeConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {minutes:10};
  }

  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    this.props.fetchActiveTest();
  }

  updateMinutes(n) {
    if(n < 1) {
      alert("Practice cannot be less than 1 minute.");
      this.setState({minutes:10});
    } else {
      this.setState({minutes:n});
    }
  }

  render() {
    return (
      <div>
        <div className = "text-md-center mt-2">
          <h2 className = "text-md-center">Configuration</h2>
          <div>Place <span style = {{color:"blue"}}>BLUE</span> on your left, and <span style = {{color:"red"}}>RED</span> on your right.</div>
          <div>Set computer volume to 50.</div>

          <div className = "mt-2">Amount of time? <input style = {{width:"50px"}} type = "number" value = {this.state.minutes}
            onChange = {(event) => {this.updateMinutes(event.target.value)}}></input> minutes</div>
          <div className = "mt-2">
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

          <div className = "mt-2"><h5>Click on icons to test speakers. When you are ready, click start.</h5></div>
          <button onClick = {this.props.startTest.bind(this, this.state.minutes)}className = "btn btn-primary btn-lg mt-2">Start</button>
          <div><Link to = "/mainmenu" className = "btn btn-secondary btn-danger mt-1">Back to Main Menu</Link></div>
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

export default connect(mapStateToProps, actions)(PracticeConfig);
