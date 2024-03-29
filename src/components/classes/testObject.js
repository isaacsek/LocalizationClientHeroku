import axios from 'axios';
import dateFormat from "dateFormat";
import Moment from "moment";
import {ROOT_URL} from "../../actions/types"

export default class Test {

  constructor(testNumber, maxTrials = 0, duration = 0, startTime = new Moment(),  practice = true) {

    this.testNumber = testNumber;
    this.maxTrials = maxTrials;
    this.duration = duration;
    this.startTime = startTime
    this.practice = practice;
    this.endTime = 0;
    this.totalCorrect = 0;
    this.trialCount = 1;
    this.leftCorrect = 0;
    this.rightCorrect = 0;
    this.leftSpeakerPlay = 0;
    this.rightSpeakerPlay = 0;
    this.avgReactionTime = 0;
    //this.avgReactionTime = Math.round((this.totalReaction / this.trialCount) * 100) / 100;
    this.timeLeft = duration * 60;
    this.totalReaction = 0;
    this.completed = false;
  }

  saveTestResults() {
    var testing = {};
    if(practice == true) {
      testing.testNumber = this.testNumber;
      testing.startTime = this.startTime
      testing.endTime = this.endTime;
      testing.leftCorrect = this.leftCorrect;
      testing.rightCorrect = this.rightCorrect;
      testing.leftSpeakerPlay = this.leftSpeakerPlay;
      testing.rightSpeakerPlay = this.rightSpeakerPlay;
      testing.totalCorrect = this.correctCount;
      testing.duration = this.duration;
      testing.avgReactionTime = Math.round((this.totalReaction / this.this.state.trials) * 100) / 100;
      testing.practice = this.practice;
      console.log("testing heress");
    }

    if(practice == false) {
      testing.testNumber = this.testNumber;
      testing.maxTrials = this.maxTrials;
      testing.startTime = this.startTime;
      testing.endTime = this.endTime;
      testing.leftCorrect = this.leftCorrect;
      testing.rightCorrect = this.rightCorrect;
      testing.leftSpeakerPlay = this.leftSpeakerPlay;
      testing.rightSpeakerPlay = this.rightSpeakerPlay;
      testing.totalCorrect = this.correctCount;
      testing.avgReactionTime = Math.round((this.totalReaction / this.this.state.trials) * 100) / 100;
      testing.practice = this.practice;
    }

    const config = { headers: { authorization: localStorage.getItem('token')}};
    axios.post(ROOT_URL + "/savetest", testing, config);
    console.log("Test Saved!");
    return testing;
  }
}
