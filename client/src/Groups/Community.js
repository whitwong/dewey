import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import groupHelpers from '../utils/groupHelpers';

import GroupCards from './GroupCards.js';
import CreateGroup from './CreateGroup.js';
import Discussion from './Discussion';


class Community extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      selectedGroup: "",
      stepIndex: 0
    };

    //this.getUser = this.getUser.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
  }

  getGroups() {
    //const { userProfile } = this.props.auth;
    groupHelpers.getGroups(this.state.email)
      .then((data) => {
        this.setState({ groups: data })
      })
  }

  // Get the user profile from Auth0. Store the email in state.email
  componentDidMount() {
    let self = this;
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ 
          email: profile.email, 
          nickname: profile.nickname,
          picture: profile.picture
        }, self.getGroups);
        
      });
    } else {
      this.setState({ 
        email: userProfile.email,
        nickname: userProfile.nickname,
        picture: userProfile.picture
       }, self.getGroups);
    }
  }

  createGroup(groupName) {
    //const { userProfile } = this.props.auth;
    groupHelpers.createGroup(groupName, this.state.email)
      .then(() => {
        this.getGroups()
      })
  }

  selectGroup(group) {
    this.setState({
      selectedGroup: group,
      stepIndex: 1
    })
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <CreateGroup createGroup={this.createGroup} />
            <GroupCards groups={this.state.groups} selectGroup={this.selectGroup} />
          </div>
        );
      case 1:
        return (
          <Discussion group={this.state.selectedGroup} nickname={this.state.nickname} />
        );
      case 2:
        return (
          <a>Show group members here :)</a>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const { stepIndex } = this.state;

    let displayStepper;
    if (stepIndex > 0) {
      displayStepper = (
        <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>

          <Stepper linear={false} activeStep={stepIndex}>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                Back to your groups page
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                Group Discussions
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                View Group Members
              </StepButton>
            </Step>
          </Stepper>


          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{ marginRight: 12 }}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 2}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      );
    } else {
      displayStepper = (
        <div style={{ minHeight: '60px' }}></div>
      );
    }

    return (
      <MuiThemeProvider>
        <div>

          {displayStepper}

          <div className="container">
            <div className="row">
              <div className="col 12">
                {this.getStepContent(stepIndex)}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Community;