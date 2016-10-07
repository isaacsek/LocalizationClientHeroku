import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

var speakers = [];
var whereLongSound = new Audio("/audio/whereLong.wav");

function attachSinkId(element, sinkId) {
    if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(sinkId).then(function() {
            console.log('Success, audio output device attached: ' + sinkId);
        }).catch(function(error) {
            var errorMessage = error;
            if (error.name === 'SecurityError') {
              errorMessage = 'You need to use HTTPS for selecting audio output ' +
                  'device: ' + error;
            }
            console.error(errorMessage);
            // Jump back to first output device in the list as it's the default.
            audioOutputSelect.selectedIndex = 0;
        });
    } else {
        console.warn('Browser does not support output device selection.');
    }
}

class Test extends Component {
  componentWillMount()
  {

    //console.log(this.props.mediaDevices);
    this.props.fetchMediaDevices();
    console.log(this.props.mediaDevices);
  }

  constructor(props) {
    super(props);
    this.state = {selectedValue: 'select'};
    this.handleSelect = this.handleSelect.bind(this);
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }



  renderOutputs()
  {
      if(this.props.mediaDevices != undefined) {
        return this.props.mediaDevices.map(function(device) {
          if(device.kind == "audiooutput") {
            return (
              <option value = {device.deviceId} key = {device.deviceId}>
                {device.label}
              </option>
            )
          }
        });
    }
  }

  handleSelect(event) {
    //console.log("hi");
    //console.log(this.state.selectedValue);
    console.log(event.target.value);
    //this.setState({selectedValue: event});
    //this.setState({selectedValue:event.target.value});
    //console.log(thi.state.selectedValue);
    //var id = event.nativeEvent.target.selectedIndex;
    //alert('native: ' + event.nativeEvent.target[id].text);
    attachSinkId(whereLongSound, event.target.value);
  }

  playSound() {
    whereLongSound.play();
  }


  render() {
    return (
      <div>
        <h3 className = "text-md-center m-t-2">Test Mode</h3>
        <center>
          <div>
          <select onChange = {this.handleSelect}>
            {/*}<option value="A">Apple</option>
            <option value="B">Banana</option>
            <option value="C">Cranberry</option>*/}
            {this.renderOutputs()}
          </select>
          <div className = "m-t-2">
            <button onClick = {this.playSound} className = "btn btn-secondary">Play Sound</button>
          </div>
          </div>
          <Link to = "/mainmenu" className = "btn btn-secondary m-t-2">Back to Main Menu</Link>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    user: state.auth.user,
    mediaDevices: state.auth.mediaDevices,
  };
}

export default connect(mapStateToProps, actions)(Test);
