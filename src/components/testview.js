import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class History extends Component {

  rendertestSelected() {
    if(!this.props.testSelected)
    {
      return <div>Select a test to get started</div>
    }

    return (
      <div className = "text-left m-t-1" id = "testView">
        <div>
          <strong>Started:</strong> {this.props.testSelected.startTime}
        </div>
        <div>
          <strong>Duration:</strong> {this.props.testSelected.timeElapsed} seconds
        </div>
        <div>
          <strong>Average Reaction:</strong> {this.props.testSelected.avgReaction} seconds
        </div>
        <div>
          <strong>Total Trials:</strong> {this.props.testSelected.maxTrials}
        </div>
        <div>
          <strong>Total Correct:</strong> {this.props.testSelected.totalCorrect}
        </div>
        <div>
          <span style = {{color:"red"}}><strong>Left Speaker Correct:</strong> {this.props.testSelected.leftCorrect}/{this.props.testSelected.leftSpeakerPlay}</span>
        </div>
        <div>
          <span style = {{color:"blue"}}><strong>Right Speaker Correct:</strong> {this.props.testSelected.rightCorrect}/{this.props.testSelected.rightSpeakerPlay}</span>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className = "text-md-center">
            <h2 className = "m-t-2">Results for Test #{this.props.testSelected.testNumber}</h2>
            {this.rendertestSelected()}
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
           testSelected: state.auth.testSelected
         };
}

export default connect(mapStateToProps, actions)(History);
