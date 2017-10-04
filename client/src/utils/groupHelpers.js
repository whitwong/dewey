import axios from 'axios';

const groupHelpers = {

	// Get a user's groups and discussions
	getGroups: (email) => {
		return axios.get('/api/groups/' + email)
			.then((response) => {
				return response;
			})
	},

	createGroup: (groupName, user) => {
		return axios.post('/api/groups', {
			name: groupName,
			user: user
		})
			.then((response) => {
				return response
			})
	},




}

// Export the API helper
export default groupHelpers;



