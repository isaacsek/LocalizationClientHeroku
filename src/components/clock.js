import React      from 'react';
import { Link }   from 'react-router'
import { connect } from 'react-redux';
import moment from "moment";
require("moment-duration-format");

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {count: 0, date: new Date(), timeLeft: 1800};
  }

  componentDidMount() {
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
      <div className="text-md-center">
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <h3>Count: {this.state.count}</h3>
          <h3>Time Left: {moment.duration(this.state.timeLeft, "seconds").format()}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Clock);
