import axios from 'axios';

const userHelpers = {

	// Get a user's groups and discussions
	getUser: (email) => {
        if (!email) {
            throw "oops no email yet"
        }
		return axios.get('/api/users/' + email)
			.then((response) => {
				return response;
			})
    },
    

}

// Export the API helper
export default userHelpers;



