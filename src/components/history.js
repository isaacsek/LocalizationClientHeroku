import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class History extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchUser();
  }

  constructor(props) {
    super(props);

    //this.onSelect = this.onSelect.bind(this);
  }

  loadUser() {
    if (this.props.user != null){
      return this.props.user.username;
    }
  }

  renderList() {
    if(this.props.user != undefined) {
      return this.props.user.history.map((test) => {
        return (

          <Link to = "/testview"
            key = {test.testNumber}
            className = "btn btn-secondary m-t-2"
            onClick = {() => this.props.selectTest(test)}>
            Test # {test.testNumber}, {test.startTime}</Link>
        );
      });
    } else {
      return <div>Loading...</div>
    }
  }

  renderActiveTest() {
    if(!this.props.activeTest)
    {
      return <div>Select a test to get started</div>
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>
          Title: {this.props.activeTest.testNumber}
        </div>
        <div>
          Total Correct: {this.props.activeTest.totalCorrect}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h3 className = "text-md-center m-t-2">History</h3>
        <center>

          <div className ="btn-group-vertical btn-group-lg m-t-1">
            <Link to = "/mainmenu" className = "btn btn-danger m-t-1">Back to Main Menu</Link>
            {this.renderList()}
          </div>



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
