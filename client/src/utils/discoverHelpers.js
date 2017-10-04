import axios from 'axios';

const discoverHelpers = {
	findBooks: function(search){
		const apiKey = "AIzaSyBUVyIW2d33WHzArLsdPx3X-X39qV-SZLY";
		const queryURL= "https://www.googleapis.com/books/v1/volumes?q=intitle:"+ search +"&key=" + apiKey;
		return axios.get(queryURL).then(function(response){
			var	returnedTitle=response.data.items[0].volumeInfo.title;
			return returnedTitle;
		});
	}
}

export default discoverHelpers;