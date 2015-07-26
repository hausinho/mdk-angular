angular.module('app.videos', [])
.controller('videosCtrl', ['$scope', '$http', 'videos', function($scope, $http, videos){

	// Get the data from the promise resolved.
	var data = videos.data.data;

	$scope.videosLimit = 12;
	$scope.videos = data;

	$scope.showMoreVideos = function() {
		$scope.videosLimit += 12;
	};


}])
.filter('splitStringAndGetPart', function(){
	return function(value, part, separator) {
		if(!value) return;
		if(!part && separator) return value;
		if(value.indexOf(' '+separator+' ') >= 0) {
			return value.split(' '+separator+' ')[part];
		}
		return value.split(separator)[part];
	}
});