import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleRequestClose = () => {
    this.setState({ open: false });
    this.props.createGroup(this.state.groupName)
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }


  render() {
    const standardActions = (
      <FlatButton
        label="Create"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <div className="col s12 center-align">

          <div>
            <Dialog
              open={this.state.open}
              title="Create a New Group"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
              autoScrollBodyContent={true}
            >
              <input
                value={this.state.title}
                type="text"
                className="form-control text-left"
                placeholder="Group Name"
                id="groupName"
                onChange={this.handleChange}
                required
              />
            </Dialog>

            <RaisedButton
              label="Create a Group"
              secondary={true}
              onTouchTap={this.handleTouchTap}
            />
            <RaisedButton
              label="Join a Group"
              secondary={true}
              onTouchTap={this.handleTouchTap}
            />

          </div>

      </div>
    )
  }

}

export default CreateGroup;