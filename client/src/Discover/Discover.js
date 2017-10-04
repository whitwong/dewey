import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DiscoverResults from './DiscoverResults';
import discoverHelpers from '../utils/discoverHelpers';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:"",
      results: [],
    };
  }

  // Use state.email from Auth0 to get MySQL user or create new user. Store user in state.user
  handleTouchTap = () => {
    discoverHelpers.findBooks(this.state.search).then(function(response){
      console.log("SEARCH FOR BOOK!");
    })

  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // Here we render the function
  render() {

    return (
      <div className="wrapper">
        <div className="row ">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <div className="row personalInfo">
              <div className="panel panel-primary discover" id="panelPrimary">
                <div className="panel-heading" id="panel">
                  <h3 className="panel-title">Discover New Books</h3>
                </div>
                <div className="panel-body">
                  <div>
                    <input
                      value={this.state.search}
                      type="text"
                      className="form-control text-left"
                      placeholder="Search by genre or author!"
                      id="search"
                      onChange={this.handleChange}
                      required
                    />
                    <MuiThemeProvider>
                    <RaisedButton
                      label="Find a Book"
                      secondary={true}
                      onTouchTap={this.handleTouchTap}
                    />
                    </MuiThemeProvider>
                    <DiscoverResults results={this.state.results}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
export default Discover;