import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LibraryResults from './LibraryResults';
import libraryHelpers from '../utils/libraryHelpers';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      comments:"",
      results:[],
      user: "",
      email: null,
      photoRef: "",
      nickname:"",
      profileOpen:false,
      favoriteBook:"",
      currentlyReading:"",
      myFavorite:"",
      myCurrent:""
    };

    this.getUser = this.getUser.bind(this);
    this.getLibrary=this.getLibrary.bind(this);
  }

  // Use state.email from Auth0 to get MySQL user or create new user. Store user in state.user
  getUser() {
    userHelpers.getUser(this.state.email)
    .then((result) => {
      this.setState({
        user: result.data
      }, this.getLibrary);
      // console.log("USER: "+this.state.user.id);
    })
  }

  getLibrary(){
    libraryHelpers.showBooks(this.state.user.id).then(function(response){
      this.setState({
        results: response.data
      })
    }.bind(this))
    libraryHelpers.getUserBooks(this.state.email).then(function(response){
      this.setState({
        myFavorite: response.data.favoriteBook,
        myCurrent: response.data.currentlyReading
      })
    }.bind(this))
  }
  // Get the user profile from Auth0. Store the email in state.email
  componentDidMount() {
    let self = this;
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        // console.log(profile);
        this.setState({ 
          email: profile.email,
          photoRef: profile.picture,
          nickname: profile.nickname
        }, self.getUser);
      });
    } else {
      this.setState({ 
        email: userProfile.email,
        photoRef: userProfile.picture,
        nickname: userProfile.nickname,
      }, self.getUser);
    }

  }


  handleRequestClose = () => {
    this.setState({open: false});
    libraryHelpers.getBookImageTitle(this.state.title).then(function(data){
      libraryHelpers.saveBook(data.returnedTitle, data.returnedAuthor, this.state.comments, data.returnedLink, this.state.user.id);
      libraryHelpers.showBooks(this.state.user.id).then(function(response){
        this.setState({
          results: response.data
        })
      }.bind(this))
    }.bind(this))
  }
  handleEditRequestClose = () => {
    this.setState({profileOpen: false});
    libraryHelpers.updateUserBooks(this.state.user.id, this.state.favoriteBook, this.state.currentlyReading).then(function(response){
      libraryHelpers.getUserBooks(this.state.email).then(function(response){
        this.setState({
          myFavorite: response.data.favoriteBook,
          myCurrent: response.data.currentlyReading
        })
      }.bind(this))
    }.bind(this))
  }

  handleTouchTap = () => {
    this.setState({ open: true });

  }
  handleEditTouchTap = () => {
    this.setState({
      profileOpen: true
    });
  }

  handleChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // Here we render the function
  render() {
    const standardActions = (
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );
    const editActions = (
      <FlatButton
        label="Update"
        primary={true}
        onTouchTap={this.handleEditRequestClose}
      />
    );

    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-sm-3 about">
            <div className="row personalInfo">
              <div className="panel panel-primary" id="panelPrimary">
                <div className="panel-heading" id="panel">
                  <h3 className="panel-title">{this.state.nickname}</h3>
                </div>
                <div className="panel-body">
                  <img src={this.state.photoRef} id="personalPicture" alt="picture"/>
                  <div id="personalInfo">
                    <p><strong>Favorite Book: </strong>{this.state.myFavorite}</p>
                    <p><strong>Currently Reading: </strong>{this.state.myCurrent}</p>
                  </div>
                  <MuiThemeProvider>
                    <div>
                      <Dialog
                        open={this.state.profileOpen}
                        title="Edit Profile"
                        actions={editActions}
                        onRequestClose={this.handleEditRequestClose}
                        autoScrollBodyContent={true}
                      >
                        <input
                          value={this.state.favoriteBook}
                          type="text"
                          className="form-control text-left"
                          placeholder="My Favorite Book"
                          id="favoriteBook"
                          onChange={this.handleChange}
                          required
                        />
                        <input
                          value={this.state.currentlyReading}
                          type="text"
                          className="form-control text-left"
                          placeholder="Currently Reading..."
                          id="currentlyReading"
                          onChange={this.handleChange}
                          required
                        />
                      </Dialog>
                      <a onTouchTap={this.handleEditTouchTap} id="editLink">Edit</a>
                    </div>
                  </MuiThemeProvider>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-9 bookList">
            <div className="panel panel-primary" id="panelPrimary">
              <div className="panel-heading" id="panel">
                <h3 className="panel-title">Bookshelf</h3>
              </div>
              <div className="panel-body"> 
                <MuiThemeProvider>
                  <div>
                    <Dialog
                      open={this.state.open}
                      title="Add a Book"
                      actions={standardActions}
                      onRequestClose={this.handleRequestClose}
                      autoScrollBodyContent={true}
                    >
                      <input
                        value={this.state.title}
                        type="text"
                        className="form-control text-left"
                        placeholder="Title"
                        id="title"
                        onChange={this.handleChange}
                        required
                      />
                      <input
                        value={this.state.comments}
                        type="text"
                        className="form-control text-left"
                        placeholder="Comments"
                        id="comments"
                        onChange={this.handleChange}
                        required
                      />
                    </Dialog>
                    <RaisedButton
                      label="Add a Book"
                      secondary={true}
                      onTouchTap={this.handleTouchTap}
                    />
                  </div>
                </MuiThemeProvider>
                <div>
                  <LibraryResults results={this.state.results}/>
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
export default Library;