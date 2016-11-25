import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import Moment from "moment";

class ResultView extends Component {

  rendertestSelected() {
    if(this.props.testSelected === undefined)
    {
      return <div className = "m-t-2"><h2>Select a test to get started!</h2></div>
    }

    return (
      <div>
      <div className = "text-md-center m-t-2">
        <h2 className = "m-t-2">Results for Test #{this.props.testSelected.testNumber}</h2>
        <div className = "text-left m-t-2" id = "testView">
        <div>
          <strong>Test #</strong> {this.props.testSelected.testNumber}
        </div>
          <div>
            <strong>Started:</strong> {Moment(this.props.testSelected.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div>
            <strong>Finished:</strong> {Moment(this.props.testSelected.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div>
            <strong>Practice Duration:</strong> {this.props.testSelected.duration} minutes
          </div>
          <div>
            <strong>Total Trials:</strong> {this.props.testSelected.trialCount}
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
          <div>
            <strong>Average Reaction:</strong> {(this.props.testSelected.totalReaction / this.props.testSelected.trialCount).toFixed(3)} seconds
          </div>
        </div>
      </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className = "text-md-center">

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
  return {
    message: state.auth.message,
    user: state.auth.user,
    testSelected: state.auth.testSelected
  };
}

export default connect(mapStateToProps, actions)(ResultView);
