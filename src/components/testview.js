import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class History extends Component {

  renderActiveTest() {
    if(!this.props.activeTest)
    {
      return <div>Select a test to get started</div>
    }

    return (
      <div className = "m-t-2">
        <div>
          Start Time: {this.props.activeTest.startTime}
        </div>
        <div>
          End Time: {this.props.activeTest.endTime}
        </div>
        <div>
          Time Elapsed: {this.props.activeTest.timeElapsed}
        </div>
        <div>
          Number of Trials: {this.props.activeTest.maxTrials}
        </div>
        <div>
          Total Correct: {this.props.activeTest.correctCount}
        </div>
        <div>
          Left Correct: {this.props.activeTest.leftCorrect}
        </div>
        <div>
          Right Correct: {this.props.activeTest.rightCorrect}
        </div>
        <div>
          Left Speaker Plays: {this.props.activeTest.leftSpeakerPlay}
        </div>
        <div>
          Right Speaker Plays: {this.props.activeTest.rightSpeakerPlay}
        </div>
        <div>
          Left Correct: {this.props.activeTest.leftCorrect}
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <center>
        <h3 className = "m-t-2">Details for Test: {this.props.activeTest.testNumber}</h3>





          {this.renderActiveTest()}
          <Link to = "/history" className = "btn btn-secondary m-t-2 bottomalligned">Back</Link>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message,
           user: state.auth.user,
           activeTest: state.auth.testSelected
         };
}

export default connect(mapStateToProps, actions)(History);
