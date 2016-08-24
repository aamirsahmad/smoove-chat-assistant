var app = angular.module('ChatHelperApp', ['chart.js']);

app.config(function ($httpProvider) { // FOR LOCAL TESTING
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
}).config(function(ChartJsProvider){
	ChartJsProvider.setOptions({ 
		colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
	});
}).filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
}).controller('MainController', 
	['$scope', 'indico', '$http', '$timeout', 'gifs', 'news',
	function($scope, indico, $http, $timeout, gifs, news) {
	
	$scope.twitter_handle = "";
	$scope.loading = false;
	$scope.error = false;
	$scope.results = false;
	$scope.custom_text = "";

	$scope.chart_options = {
		scales:
        {
            xAxes: [{
                display: false
            }]
        }
	};

	$scope.submitTwitterHandle = function(){
		$scope.loading = true;

		console.log($scope.twitter_handle);
		$http.get(
			'/getTweets/' + $scope.twitter_handle.replace("@","")
		).then(function(success){

			var text = success.data + " " + $scope.custom_text;
			console.log(text);

			/* THUS BEGINS THE CALLBACK HELL */

			indico.getTextTags(text, function(success){
				$scope.topics = success;

				gifs.getGifs($scope.topics, function(gif_array){
					$scope.gifs = gif_array;
					console.log($scope.gifs);
				});

				news.getNews($scope.topics, function(news_array){
					$scope.news = news_array;
					console.log(news_array);
				})

			indico.getPersonality(text, function(success){
				$scope.personalities = success;

			indico.getPolitical(text, function(success){
				$scope.political_parties = success;
				$scope.labels = [];
				$scope.data = [];

				for (var i = 0; i < $scope.political_parties.length; i++){
					$scope.labels.push($scope.political_parties[i].word);
					$scope.data.push($scope.political_parties[i].value * 100);
				}

				$timeout(function(){
					$scope.loading = false;
					$scope.results = true;
				}, 1000);
			
			});});});

		}, function(failure){
			console.error(failure);
			$scope.loading = false;
			$scope.error = true;
		});

	}

}]);
