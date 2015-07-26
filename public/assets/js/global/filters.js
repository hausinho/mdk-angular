angular.module('app.filters', [])
.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
})
.filter('youtubeEmbedUrl', function($sce) {
    return function(videoId) {
		return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId);
    }
})
.filter('trimTrack', function () {
  return function (track) {
      return track.substring(3);
  };
})
.filter('trimYear', function () {
  return function (year) {
      return year.substring(0,4);
  };
});