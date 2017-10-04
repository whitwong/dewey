
import React, {Component} from 'react';

import discussionHelpers from '../utils/helpersDiscussion';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';
import moment from 'moment';
import CreateDiscussion from './CreateDiscussion';

const config = {
  apiKey: "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY",
  authDomain: "bookclub-ed08b.firebaseapp.com",
  databaseURL: "https://bookclub-ed08b.firebaseio.com",
  projectId: "bookclub-ed08b",
  storageBucket: "bookclub-ed08b.appspot.com",
  messagingSenderId: "874403788158"
};
firebase.initializeApp(config);

const divStyle = {textAlign: "center"}
const chatNameStyles = {fontWeight: "bold"}
const chatTimeStyles = {	color: "grey", fontSize: "0.8em"}
const menuStyles = {float: "right"}

class Discussion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			name: "",
			time: "",
			discList: [],
			userMessage: "",
			firebaseMessages: [],
			chatId: "",
			chatName: "",
			openEdit: false,
			openDelete: false
		}
		this.getDiscussions = this.getDiscussions.bind(this);
		this.handleSubmitChat = this.handleSubmitChat.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTabClick = this.handleTabClick.bind(this);
		this.getData = this.getData.bind(this);
		this.deleteDiscussion = this.deleteDiscussion.bind(this);
		this.editDiscussionName = this.editDiscussionName.bind(this);
	}

  handleChange = (event) => {
    var newState={};
    newState[event.target.id]=event.target.value;
    this.setState(newState);
  }

  handleTabClick(tab) {
  	this.setState({ chatId: tab.props.value }, this.getData)
  }

  handleSubmitChat = (event) => {
    event.preventDefault();
		const chatRef = firebase.database().ref().child('chat').child('chat'+this.state.chatId);
		const chat = {
			message: this.state.userMessage,
			name: this.props.nickname,
			time: firebase.database.ServerValue.TIMESTAMP
		}
		chatRef.push(chat);
    this.setState({ userMessage: "" });
  }

  handleOpenEdit = () => {
    this.setState({ openEdit: true });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

	getDiscussions() {
		discussionHelpers.getDiscussionsOfGroup(this.props.group.id)
			.then((ListOfDiscussions) => {
				this.setState({ discList: ListOfDiscussions })
			})
	}

	deleteDiscussion() {
		discussionHelpers.deleteDiscussion(this.props.group.id, this.state.chatId)
			.then(() => {
				const chatRef = firebase.database().ref().child('chat').child("chat"+this.state.chatId);
    		chatRef.remove();
    		this.handleCloseDelete();
				this.getDiscussions();
			})
	}

	editDiscussionName() {
		discussionHelpers.updateDiscussionName(this.props.group.id, this.state.chatId, this.state.chatName)
			.then(() => {
				this.handleCloseEdit();
				this.getDiscussions();
				this.setState({ chatName: "" })
			})
	}

  getData() {
		const chatRef = firebase.database().ref().child('chat').child('chat'+this.state.chatId);
		chatRef.orderByChild("time").on('value', snap => {
			let firebaseMessages = snap.val();
			let newStateChat = [];
			for (let chat in firebaseMessages){
				newStateChat.push({
					id: chat,
					message: firebaseMessages[chat].message,
					name: firebaseMessages[chat].name,
					time: moment(firebaseMessages[chat].time).format("L LT")
				})
			}
			this.setState({
				firebaseMessages: newStateChat
			})
		})
  }

	componentDidMount(){
		this.getDiscussions();
	}

	render(){
    const editActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseEdit}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.editDiscussionName}
      />,
    ];

    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseDelete}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onClick={this.deleteDiscussion}
      />,
    ];

		let display;
		if (!this.state.discList.data){
			display = (
			  <Tabs className="col s5">
			    <Tab label="+ Create Chat" >
			    	<CreateDiscussion groupId={this.props.group.id} getDiscussions={this.getDiscussions} />
			    </Tab>
			  </Tabs>
			);
		} else {
		  display = (
			  <Tabs className="col s8 offset-s2">
			  	<Tab label="+ Create Chat" >
			    	<CreateDiscussion groupId={this.props.group.id} getDiscussions={this.getDiscussions} />
			    </Tab>
			    {this.state.discList.data.map((discussion, i)=>{
			    	return (
			    		<Tab key={i} label={discussion.name} value={discussion.id} onActive={this.handleTabClick}>
					      <div>
					      {this.state.firebaseMessages.map((chat) => {
					      	return(
					      		<p key={chat.id}>
					          	<span style={chatNameStyles}>{chat.name}</span><span style={chatTimeStyles}> at {chat.time}</span>
					          	<br />
					          	<span>{chat.message}</span> 
					        	</p>
					        )
					      })}
					        <TextField 
					          value={this.state.userMessage}
					          type="text"
					          placeholder="Add to the conversation!"
					          id="userMessage"
					          onChange={this.handleChange}
					          fullWidth={true}
					          onSubmit={(event) => this.handleSubmitChat(event)}
					         />
					        <RaisedButton label="Add" type="submit" primary={true} onClick={this.handleSubmitChat} />
			            <IconMenu
							      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
							      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
							      targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
							      style={menuStyles}
						    	>
						      <MenuItem primaryText="Edit Chat Name" onClick={this.handleOpenEdit} />
						      <MenuItem primaryText="Delete Chat" onClick={this.handleOpenDelete} />
						    </IconMenu>
					      </div>
			    		</Tab>
			    	)
			    })}
			  </Tabs>
		  );
		}

		return(
			<div className="container" style={divStyle}>
				{display}
        <Dialog
          title="Update Discussion Name"
          actions={editActions}
          modal={false}
          open={this.state.openEdit}
 		      onRequestClose={this.handleCloseEdit}
        >
					<TextField 
	          value={this.state.chatName}
	          type="text"
	          placeholder="Enter new name"
	          id="chatName"
	          onChange={this.handleChange}
	          fullWidth={true}
	          onSubmit={(event) => this.editDiscussionName(event)}
	        />
        </Dialog>

        <Dialog
        	title="Delete Discussion?"
          actions={deleteActions}
          modal={false}
          open={this.state.openDelete}
          onRequestClose={this.handleCloseDelete}
        >
        	Are you sure??? You won't be able retrieve this discussion after you delete it.
        </Dialog>
			</div>
		)
	}
}

export default Discussion;
