angular.module('ChatHelperApp')
.factory('gifs', ['$http', function($http) {
	var url = 'http://api.giphy.com/v1/gifs/search';
	
	return {
		getGifs: function(tags_array, callback){
			var gif_query_string = tags_array[0].word.split("_").join("+")
				+ "+" + tags_array[1].word.split("_").join("+")
				+ "+" + tags_array[2].word.split("_").join("+");

			console.log(gif_query_string);

			$http.get(url, {
				params: {
					api_key: "dc6zaTOxFJmzC",
					q: gif_query_string,
					limit: 9,
					rating: "pg-13"
				}
			}
			).then(function(success){
				var gif_array = success.data.data;
				console.log(gif_array);
				callback(gif_array);
			});
		}
	}

}]);