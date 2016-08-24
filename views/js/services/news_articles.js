angular.module('ChatHelperApp').factory('news', function($http) {
	var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search";
	var api_key = "c29a6df448334cacb83b0252310ce806";

	return {
		getNews: function(tags_array, callback){
			var news_query_string = tags_array[0].word.split("_").join(" ")
				+ " " + tags_array[1].word.split("_").join(" ")
				+ " " + tags_array[2].word.split("_").join(" ");

			$http.get( url, {
				params: {
					q: news_query_string,
					count: 5
				},
				headers: {
					'Ocp-Apim-Subscription-Key': api_key
				}
			}
			).then(function(success){
				console.log(success);
				callback(success.data.value);
			});
		}
	}

});