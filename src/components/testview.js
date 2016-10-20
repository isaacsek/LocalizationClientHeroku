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
      <div className = "text-left m-t-1" id = "testView">
        <div>
          Started: {this.props.activeTest.startTime}
        </div>
        <div>
          Duration: {this.props.activeTest.timeElapsed}
        </div>
        <div>
          Total Trials: {this.props.activeTest.maxTrials}
        </div>
        <div>
          Total Correct: {this.props.activeTest.totalCorrect}
        </div>
        <div>
          <span style = {{color:"red"}}>Left Speaker Plays: {this.props.activeTest.leftSpeakerPlay}</span>
        </div>
        <div>
          <span style = {{color:"red"}}>Left Correct: {this.props.activeTest.leftCorrect}</span>
        </div>
        <div>
          <span style = {{color:"blue"}}>Right Speaker Plays: {this.props.activeTest.rightSpeakerPlay}</span>
        </div>
        <div>
          <span style = {{color:"blue"}}>Right Correct: {this.props.activeTest.rightCorrect}</span>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className = "text-md-center">
            <h2 className = "m-t-2">Results for Test #{this.props.activeTest.testNumber}</h2>
            {this.renderActiveTest()}
        </div>
        <center>
          <Link to = "/history" className = "btn btn-danger m-t-2 bottomalligned">Back</Link>
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
