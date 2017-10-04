/* import React, { Component } from 'react';

import groupHelpers from '../utils/groupHelpers';

import GroupCards from './GroupCards.js';
import CreateGroup from './CreateGroup.js';

class Groups extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groups: [],
		};

		this.getGroups = this.getGroups.bind(this);
		this.createGroup = this.createGroup.bind(this);
	}

	componentDidMount() {
		this.getGroups();
	}

	getGroups() {
		const { userProfile } = this.props.auth;
		console.log(userProfile.email);
		groupHelpers.getGroups(userProfile.email)
			.then((data) => {
				this.setState({ groups: data })
			})
	}

	createGroup(groupName) {
		const { userProfile } = this.props.auth;
		groupHelpers.createGroup(groupName, userProfile.email)
			.then(() => {
				this.getGroups()
			})
	}


	render() {

		return (
			<div className="wrapper">
				<div className="row">
				
					<div className="col s7 group">
						<CreateGroup createGroup={this.createGroup} />
						<GroupCards groups={this.state.groups} />
					</div>
				</div>
			</div>
		)
	}

}

export default Groups; */