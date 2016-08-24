angular.module('ChatHelperApp').
	factory('indico', ['$http', 'news', function($http) {

	var api_key = 'f844248f8582881cdf65b74c1718d0ac',
		api_url_tags = 'https://apiv2.indico.io/texttags?version=2',
		api_url_personality = 'https://apiv2.indico.io/personality',
		api_url_political = 'https://apiv2.indico.io/political';


	function getPolitical(text, callback){
		$http.post(
			api_url_political,
			JSON.stringify({
				'api_key': api_key,
				'data': text,
				'threshold': 0.1
			})
		).then(function(res) {
			var word_array = [];
			var result = res.data.results;

			// console.log(result);

			for (var key in result) {
				word_array.push({
					word: key,
					value: result[key]
				});
			}

			word_array.sort(function(a, b){return b.value - a.value});
			console.log(word_array);
			callback(word_array);
		}, function(error){
			 console.log(error);
		});
	}

	function getPersonality(text, callback){
		$http.post(
			api_url_personality,
			JSON.stringify({
				'api_key': api_key,
				'data': text,
				'threshold': 0.1
			})
		).then(function(res) {
			var word_array = [];
			var result = res.data.results;

			// console.log(result);

			for (var key in result) {
				word_array.push({
					word: key,
					value: result[key]
				});
			}

			word_array.sort(function(a, b){return b.value - a.value});
			console.log(word_array);
			callback(word_array);
		}, function(error){
			 console.log(error);
		});
	}

	function getTextTags(text, callback){
		$http.post(
			api_url_tags,
			JSON.stringify({
				'api_key': api_key,
				'data': text,
				'threshold': 0.1
			})
		).then(function(res) {
			var word_array = [];
			var result = res.data.results;

			// console.log(result);

			for (var key in result) {
				word_array.push({
					word: key,
					value: result[key]
				});
			}

			word_array = word_array.sort(function(a, b){return b.value - a.value}).slice(0, 7);

			for (var i = 0; i < word_array.length; i++){
				// get news article
			}

			console.log(word_array);
			callback(word_array);
		}, function(error){
			 console.log(error);
		});
	}

	return {
		getTextTags: getTextTags,
		getPolitical: getPolitical,
		getPersonality: getPersonality

	}
}]);