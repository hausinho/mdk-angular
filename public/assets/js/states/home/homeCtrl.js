angular.module('app.home', [])
.controller('homeMainCtrl', ['$scope', 'home', '$sce', function($scope, home, $sce){

	// Get the data from the promise resolved.
	var data = home.data;

	// hold all the frontpage in this object.
	$scope.home = {};

	// Set limits items to show on each list
	$scope.home.limits = {
		news: {
			perPage:6,
			showing:6
		},
		concerts: {
			perPage:4,
			showing:4
		},
		videos: {
			perPage:8,
			showing:8
		},
		genre: {
			perPage:8,
			showing:8
		},
		decade: {
			perPage:8,
			showing:8
		}
	};

	// Place a random item to be the artist of the main page
	$scope.home.featured = data.featured[Math.floor(Math.random() * data.featured.length)];

	// Set the news
	$scope.home.news = data.news;

	// Set random contest
	$scope.home.contest = data.contests[Math.floor(Math.random() * data.contests.length)];
	$scope.home.contest.description = $sce.trustAsHtml($scope.home.contest.description);

	// Set videos
	$scope.home.videos = data.videos;

	// Set concerts
	$scope.home.concerts = data.concerts;

	// Set the genre to Pop/rock
	$scope.home.genreSelected = 'poprock';
	$scope.home.genre = data.genres.poprock;

	// Set the decade active to 2010
	$scope.home.decadeSelected = '2010';
	$scope.home.decade = data.decades['2010'];

	// When clicked, will append more items to the list

	$scope.showMoreItemsOnList = function(list) {
		$scope.home.limits[list].showing += $scope.home.limits[list].perPage;
	};


	$scope.showItemsOfList = function(list, key){
		$scope.home[list + 'Selected'] = key;
		$scope.home.limits[list].showing = $scope.home.limits[list].perPage;
		$scope.home[list] = data[list + 's'][key];
	};



}]);