import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import Moment from "moment";

class History extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  constructor(props) {
    super(props);
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  renderList() {
    if(this.props.user != undefined) {
      return (
            this.props.user.history.map((test) => {
            return (

              <Link to = "/resultview"
                key = {test.testNumber}
                className = "btn btn-secondary mt-2 text-md-left" style = {{color: 'black'}}
                onClick = {() => this.props.selectTest(test)}>
                    Test #{test.testNumber}, {Moment(test.startTime).format("MMMM Do YYYY")}, <span style = {{color:"red"}}>Score: {test.totalCorrect}/{test.trialCount}</span></Link>
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

  renderBack() {
    if(this.props.user != undefined) {
      return (
        <Link to = "/mainmenu" className = "btn btn-danger mt-1">Back to Main Menu</Link>
      );
    }
  }

  rendertestSelected() {
    if(!this.props.testSelected)
    {
      return <div>Select a test to get started</div>
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>
          Title: {this.props.testSelected.testNumber}
        </div>
        <div>
          Total Correct: {this.props.testSelected.totalCorrect}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className = "text-md-center">
        <h2 className = "text-md-center mt-2">History</h2>

          <div className ="btn-group-vertical btn-group-lg">
            {this.renderBack()}
            {this.renderList()}
          </div>

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
