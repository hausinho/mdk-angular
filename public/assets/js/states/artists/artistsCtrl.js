angular.module('app.artists', [])
.controller('artistsAllCtrl', ['$scope', 'artists', function($scope, artists){
	var data = artists.data.data;
	
	$scope.artists = {};
	
	$scope.artists.list = data;
	
}])
.controller('artistsAZCtrl', ['$scope', '$http', 'artistsLetter', '$sce', '$stateParams', function($scope, $http, artistsLetter, $sce, $stateParams){
	
	var data = artistsLetter.data.data;

	$scope.artistsLetter = {};
	
	$scope.artistsLetter.list = data;
	$scope.letter = $stateParams.letter;
	
}])
.controller('artistMainCtrl', ['$scope', '$http', 'artist', function($scope, $http, artist){
	var data = artist.data.data;
	
	$scope.artist = data;
	$scope.artistcover = data.images.cover;
}])
.controller('artistDetailsCtrl', ['$scope', '$http', '$state', 'artist', 'artistRSS', 'artistSocialMedia', '$sce', '$stateParams', function($scope, $http, $state, artist, artistRSS, artistSocialMedia, $sce, $stateParams){

	var data = artist.data.data;

	$scope.artistDetails = {};
	
	$scope.artistDetails.limits = {
		rss: {
			perPage:6,
			showing:6
		},
		socialmedia: {
			perPage:6,
			showing:6
		}
	};	
	
	// General info
	$scope.artistDetails.artistname = data.name;
	$scope.artistDetails.artistcover = data.images.cover;
	$scope.artistDetails.biography = data.bio;
	$scope.artistDetails.nextconcerts = data.concerts;
	
	$scope.nextShows = $scope.artistDetails.nextconcerts.length;
	
	// Available Tabs Sections
	$scope.artistDetails.releases = data.sections.releases;
	$scope.artistDetails.videos = data.sections.videos;
	$scope.artistDetails.concerts = data.sections.concerts;
	$scope.artistDetails.contests = data.sections.contests;
	$scope.artistDetails.merchandise = data.sections.merchandise;
	$scope.artistDetails.polls = data.sections.polls;
	$scope.artistDetails.quizzes = data.sections.quizzes;
	
	// Social Media Links
	$scope.artistDetails.links = Object.keys(data.links).length > 0;
	
	$scope.artistDetails.facebook = data.links.facebook;
	$scope.artistDetails.twitter = data.links.twitter;
	$scope.artistDetails.instagram = data.links.instagram;
	$scope.artistDetails.soundcloud = data.links.soundcloud;
	
	// RSS
	var rss = artistRSS.data.data;
	$scope.artistDetails.rss = rss.news;
	
	// SOCIAL MEDIA
	var socialmedia = artistSocialMedia.data.data;	
	$scope.artistDetails.socialmedia = socialmedia.posts;

	
	// VIDEOS
	$scope.artistDetails.videos = data.videos;
	
	$scope.showMoreItemsOnList = function(list) {
		$scope.artistDetails.limits[list].showing += $scope.artistDetails.limits[list].perPage;
	};

	$scope.artistDetails.campaignLinks = data.campaignLinks;
	console.log($scope.artistDetails.campaignLinks)
	
}])
.controller('artistVideosCtrl', ['$scope', '$http', 'artistVideos', '$stateParams', '$sce', function($scope, $http, artistVideos, $stateParams, $sce){

	var data = artistVideos.data.data;
	
	$scope.artistVideos = {};
	
	// ALL VIDEOS BY ARTIST
	$scope.artistVideos.videos = data.videos;
	
	// NEWEST VIDEO
	$scope.artistVideos.ytid = data.videos[0].ytid;
	
	// ARTISTNAME
	$scope.artistVideos.artistname = data.name;
	
	
}])
.controller('artistReleasesCtrl', ['$scope', '$http', 'artistReleases', '$stateParams', function($scope, $http, artistReleases, $stateParams){
	
	var data = artistReleases.data.data;
	
	$scope.artistReleases = {};
	
	// ALL RELEASES BY ARTIST
	$scope.artistReleases.releases = data.releases;
	
	// GET STREAMING SERVICES FROM NEWEST RELEASE
	$scope.artistReleases.services = data.releases[0].services;
	

}])
.controller('artistConcertsCtrl', ['$scope', '$http', 'artistConcerts', '$stateParams', function($scope, $http, artistConcerts, $stateParams){
	
	var data = artistConcerts.data.data;
	
	$scope.artistConcerts = {};
	
	// ALL DATA BY ARTIST ON CONCERTPAGE
	$scope.artistConcerts.artist = data;
	
	// ALL CONCERTS BY ARTIST
	$scope.artistConcerts.concerts = data.concerts;
	
	// NEXT CONCERT
	$scope.artistConcerts.nextConcert = data.concerts[0];

}])
.controller('artistQuizCtrl', ['$scope', '$http', '$sce', 'artistQuizzes', '$stateParams', function($scope, $http, $sce, artistQuizzes, $stateParams){
	
	var data = artistQuizzes.data.data;
	
	$scope.artistQuizzes = {};
	
	$scope.artistQuizzes.artist = data;
	
	$scope.artistQuizzes.quizzes = data.quizzes;
	
	angular.forEach($scope.artistQuizzes.quizzes, function(v, i){
		$scope.artistQuizzes.quizzes[i].description = $sce.trustAsHtml($scope.artistQuizzes.quizzes[i].description);
	});
	
	
}]);