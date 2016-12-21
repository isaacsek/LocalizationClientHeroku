import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import Moment from "moment";
import json2csv from "json2csv";

class Admin extends Component {
  componentWillMount() {
    this.props.fetchUser();
    this.props.fetchDB();
  }

  constructor(props) {
    super(props);
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  loadUsers() {
    if (this.props.users != null){
      return this.props.users;
    }
  }

  fetchDB() {
    if(this.props.users == undefined) {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    } else {
      return <div>{JSON.stringify(this.props.users)}</div>
    }
  }

  downloadCSV(history) {
    //var history = this.props.selectUserTest;
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

  renderUserTests() {
    if(this.props.selectedUser == undefined) {
      return (
        <div className = "">
          Choose a user to get started!
        </div>
      );
    } else {
      return this.props.selectedUser.history.evaluations.map((test) => {
        return (
          <div className = "btn btn-secondary mt-1" key = {test.testNumber} onClick = {() => {this.props.selectUserTest(test)}} >
            Test #{test.testNumber}, {Moment(test.startTime).format("MMMM Do YYYY")}, <span style = {{color:"red"}}>Score: {test.totalCorrect}/{test.trialCount}</span>
          </div>
        );
      })
    }
  }

  renderUserPractices() {
    if(this.props.selectedUser == undefined) {
      return (
        <div className = "">
          Choose a user to get started!
        </div>
      );
    } else {
      return this.props.selectedUser.history.practices.map((test) => {
        return (
          <div className = "btn btn-secondary mt-1" key = {test.testNumber} onClick = {() => {this.props.selectUserTest(test)}}>
            Test #{test.testNumber}, {Moment(test.startTime).format("MMMM Do YYYY")}, <span style = {{color:"red"}}>Score: {test.totalCorrect}/{test.trialCount}</span>
          </div>
        );
      })
    }
  }

  renderUserTestsSelected() {
    if(this.props.selectedUserTest == undefined) {
      return (
        <div className = "">
          Choose a test to get started!
        </div>
      );
    } else {
      return (
        <div className = "text-left" id = "testView">
          <div>
            <strong>Test #</strong> {this.props.selectedUserTest.testNumber}
          </div>
          <div>
            <strong>Started:</strong> {Moment(this.props.selectedUserTest.startTime).format("dddd, MMMM Do YYYY")}
          </div>
          <div>
            <strong>Finished:</strong> {Moment(this.props.selectedUserTest.endTime).format("dddd, MMMM Do YYYY")}
          </div>
          <div>
            <strong>Practice Duration:</strong> {Moment(this.props.selectedUserTest.endTime).unix() - Moment(this.props.selectedUserTest.startTime).unix()} seconds
          </div>
          <div>
            <strong>Total Trials:</strong> {this.props.selectedUserTest.trialCount}
          </div>
          <div>
            <strong>Total Correct:</strong> {this.props.selectedUserTest.totalCorrect}
          </div>
          <div>
            <span style = {{color:"red"}}><strong>Left Speaker Correct:</strong> {this.props.selectedUserTest.leftCorrect}/{this.props.selectedUserTest.leftSpeakerPlay}</span>
          </div>
          <div>
            <span style = {{color:"blue"}}><strong>Right Speaker Correct:</strong> {this.props.selectedUserTest.rightCorrect}/{this.props.selectedUserTest.rightSpeakerPlay}</span>
          </div>
          <div>
            <strong>Average Reaction:</strong> {(this.props.selectedUserTest.totalReaction / this.props.selectedUserTest.trialCount).toFixed(3)} seconds
          </div>
          <a className = "btn btn-success mt-2" href = {this.downloadCSV(this.props.selectedUserTest)} download = {this.props.selectedUser.username + "_test_" + this.props.selectedUserTest.testNumber + ".csv"}>Download</a>
        </div>
      );
    }
  }

  renderUsers() {
    if(this.props.users != undefined) {
      return (
            this.props.users.map((user) => {
            return (
              <button
                key = {user._id}
                className = "btn btn-secondary mt-1" style = {{color: 'black'}}
                onClick = {() => {this.props.selectUser(user)}}>
                    User: {user.username}</button>
            );
          })
        );
    } else {
      return (
        <div className = "v1">
          <div className = "v2">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <h2 className = "text-md-center mt-2">Admin Page</h2>

        <div className = "text-md-center container mt-2">
          <div className = "row">

            <div className ="btn-group-vertical btn-group-md col-md-2">
              <div className = "btn btn-primary">Users</div>
              {this.renderUsers()}
            </div>

            <div className = "btn-group-vertical btn-group-md col-md-4">
              <strong className = "btn btn-danger" >Evaluations</strong>
              {this.renderUserTests()}

              <strong className = "btn btn-danger mt-2">Practices</strong>
              {this.renderUserPractices()}
            </div>

            <div className = "col-md-6">
              {this.renderUserTestsSelected()}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.auth.message,
    user: state.auth.user,
    testSelected: state.auth.testSelected,
    users: state.activeTest.users,
    selectedUser: state.activeTest.selectedUser,
    selectedUserTest: state.activeTest.selectedUserTest
  };
}

export default connect(mapStateToProps, actions)(Admin);
