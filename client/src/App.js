import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const muiTheme = getMuiTheme({
  flatButton: {
    textColor: '#ffffff',
  },
});

const styles = {

  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '75%',
  },
};


class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    const { isAuthenticated } = this.props.auth;

    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            style={styles.appBar}
            titleStyle={{ fontSize: '54px' }}
            title={<span>Dewey.</span>}
            showMenuIconButton={false}
          >
            {
              isAuthenticated() && (
                <Tabs style={styles.tabs}>
                  <Tab
                    icon={<FontIcon className="material-icons">favorite</FontIcon>}
                    label="LIBRARY"
                    onTouchTap={this.goTo.bind(this, 'library')}
                  />
                  <Tab
                    icon={<FontIcon className="material-icons">public</FontIcon>}
                    label="COMMUNITY"
                    onTouchTap={this.goTo.bind(this, 'community')}
                  />
                  <Tab
                    icon={<FontIcon className="material-icons">whatshot</FontIcon>}
                    label="DISCOVER"
                    onTouchTap={this.goTo.bind(this, 'discover')}
                  />
                </Tabs>
              )
            }
            {
              isAuthenticated() && (
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem primaryText="Sign out" onTouchTap={this.logout.bind(this)} />
                </IconMenu>
              )
            }
          </AppBar>

          <div className="mainSection">
            {this.props.children}
          </div>

        </div >
      </MuiThemeProvider>

    );
  }
}

export default App;

