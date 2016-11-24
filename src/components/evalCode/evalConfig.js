import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import moment from "moment";
import Sound from "../classes/sound";
import TestObject from "../classes/testObject";

var sounds = new Sound();

class EvalConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {trials:10};
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

  render() {
    return (
      <div>
        <div className = "text-md-center m-t-2">
          <h2 className = "text-md-center">Configuration</h2>
          <div>Place <span style = {{color:"blue"}}>BLUE</span> on your left, and <span style = {{color:"red"}}>RED</span> on your right</div>

          <div className = "m-t-2">Number of Trials? <input style = {{width:"50px"}} type = "number" value = {this.state.trials}
            onChange = {(event) => {this.updateTrials(event.target.value)}}></input> Trials</div>
          <div className = "m-t-2">
            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary btn-lg btn-outline-primary" src="images/blueSpeaker.png" height="150px" width="150px"
                onClick = {() => {sounds.setSide("left"); sounds.play();}}/>
              <figcaption>Left Speaker</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img className = "btn btn-secondary m-l-1 m-r-1" src="images/userIcon.png" height="200px" width="200px"
                onClick = {() => {console.log("Hello, world!")}}/>
              <figcaption>You</figcaption>
            </figure>

            <figure style = {{display:"inline-block"}}>
              <img disabled = "true" className = "btn btn-secondary btn-lg btn-outline-danger" src="/static/images/redSpeaker.png" height="150px" width="150px"
                onClick = {() => {sounds.setSide("right"); sounds.play();}}/>
              <figcaption>Right Speaker</figcaption>
            </figure>
          </div>

          <div className = "m-t-2"><h5>Click on icons to test speakers. When you are ready, click start.</h5></div>
          <button onClick = {this.props.startTest.bind(this, this.state.trials)}className = "btn btn-primary btn-lg m-t-2">Start</button>
          <div><Link to = "/mainmenu" className = "btn btn-secondary btn-danger m-t-2">Back to Main Menu</Link></div>
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
