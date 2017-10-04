import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import discoverHelpers from '../utils/libraryHelpers';

class DiscoverResults extends Component {
  render() {
    return (
      <div>
        {this.props.results.map(function(search,i){
          return (
            <div key={i}>
                  <p className="bookTitle">{search.title}</p>
                  <img className="bookImage" title={search.title} id={search.id} src={search.link}/>
            </div>
          )
        }.bind(this)
        )}
      </div>
    );
  }
};

export default DiscoverResults;