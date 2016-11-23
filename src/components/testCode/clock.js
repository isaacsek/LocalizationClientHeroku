import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {ROOT_URL} from "../../actions/types"
import * as actions from '../../actions';
import axios from 'axios';
import dateFormat from "dateFormat";
import moment from "moment";
import TestObject from "./testObject";
import Sound from "./sound";
import "moment-duration-format";

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: 0, date: new Date(), timeLeft: 1800};
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchMediaDevices();
    this.props.fetchActiveTest();

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(), count: this.state.count + 1, timeLeft:this.state.timeLeft - 1
    });
  }

  render() {
    return (
      <div>
          <h3>Time Left: {moment.duration(this.state.timeLeft, "seconds").format()}</h3>
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

export default connect(mapStateToProps, actions)(Clock);
