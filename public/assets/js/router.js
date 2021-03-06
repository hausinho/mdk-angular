angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$anchorScrollProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $anchorScrollProvider) {

	// // this is required for the root url to direct to /#/
	$urlRouterProvider.otherwise('/');

	// use the HTML5 History API
	$locationProvider.html5Mode({
		requireBase: false,
		enabled: true
	})
	.hashPrefix('!');

	var assets_url = '/assets/js';
    
    $stateProvider
   .state('home', {
   		url: '/',
         resolve: {
            home: ['homeService', function(homeService){
               return homeService.query().$promise;
            }]
         },
   		controller: 'homeMainCtrl',
   		templateUrl: assets_url + '/states/home/tpls/home-main.tpl.html'
   })
   .state('artist', {
      templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.base.tpl.html',
      abstract: true,
      url: '/:slug',
      controller: 'artistMainCtrl',
      resolve: {
         artist: function($http, APIURL, $stateParams){
            return $http.get(APIURL + '/i/artist/'+$stateParams.slug);
         }
      }
   })
   .state('artist.main', {
      url: '',
	   controller: 'artistDetailsCtrl',
	   templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.main.tpl.html',
		resolve: {
			artistRSS: function($http, APIURL, $stateParams){
				return $http.get(APIURL + '/i/artist/'+$stateParams.slug+'/news');
			},
			artistSocialMedia: function($http, APIURL, $stateParams){
				return $http.get(APIURL + '/i/artist/'+$stateParams.slug+'/feed');
			}			
		},
		defaultChild: 'artist.main',
   })
   .state('artist.videos', {
	   url: '/videoer',
	   controller: 'artistVideosCtrl',
	   templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.videos.tpl.html',
	   resolve: {
		   artistVideos: function($http, APIURL, $stateParams){
				return $http.get(APIURL + '/i/artist/'+$stateParams.slug+'/videos');			  
		   }
	   }
   })
   .state('artist.releases', {
	   url: '/udgivelser',
	   controller: 'artistReleasesCtrl',
	   templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.releases.tpl.html',
	   resolve: {
		   artistReleases: function($http,APIURL,$stateParams){
			   return $http.get(APIURL + '/i/artist/'+$stateParams.slug+'/releases');
		   }
	   }
   })
   .state('artist.concerts', {
	   url: '/koncerter',
	   controller: 'artistConcertsCtrl',
	   templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.concerts.tpl.html',
	   resolve: {
		   artistConcerts: function($http, APIURL, $stateParams){
			   return $http.get(APIURL + '/i/artist/' + $stateParams.slug + '/concerts');
		   }
	   }
   })
   .state('artist.quizzes', {
	   url:'/quizzer',
	   controller: 'artistQuizCtrl',
	   templateUrl: assets_url + '/states/artists/tpls/artistDetails/artist.quizzes.tpl.html',
	   resolve: {
		   artistQuizzes: function($http, APIURL, $stateParams){
			   return $http.get(APIURL + '/i/artist/' + $stateParams.slug + '/quizzes');
		   }
	   }
   })
   .state('artist.main.quiz', {
         url: '/quiz/:quiz_slug',
         resolve: {
            quiz: ['artistService', '$stateParams', function(artistService, $stateParams){
               return artistService.get({action:'quiz', action_slug: $stateParams.quiz_slug, artist_slug:$stateParams.artist_slug}).$promise;
            }]
         },
         controller: 'quizzesDetailCtrl',
         templateUrl: assets_url + '/states/quizzes/tpls/quizzes-detail.tpl.html'
   })
   .state('artists', {
	   url: '/artister',
      template: '<ui-view/>',
      abstract: true	   
   })
   .state('artists.list', {
	   url: '/',
		resolve: {
			artists: function($http, APIURL){
				return $http.get(APIURL + '/i/artists');
			}
		},
		controller: 'artistsAllCtrl',
		templateUrl: assets_url + '/states/artists/tpls/artists-all-list.tpl.html'
   })
   .state('artists.list.letter', {
	   url: '/:letter', 
	   controller: 'artistsAZCtrl',
		templateUrl: assets_url + '/states/artists/tpls/artists-az-list.tpl.html',
		resolve: {
			artistsLetter: function($http, APIURL, $stateParams){
				return $http.get(APIURL + '/i/artists/'+$stateParams.letter);
			}
		}	
   })
   .state('contests', {
	   url: '/konkurrencer',
      template: '<ui-view/>',
      abstract: true
   })
   .state('contests.list', {
      url: '/',
      resolve: {
         contests: ['contestService', function(contestService) {
            return  contestService.query().$promise;
         }]
      },
      controller: 'contestsListMainCtrl',
      templateUrl: assets_url + '/states/contests/list/tpls/contests-main.tpl.html'
   })
   .state('contests.detail', {
      url: '/:contest_id',
      controller: 'contestsDetailCtrl',
      templateUrl: assets_url + '/states/contests/detail/tpls/contests-detail.tpl.html',
      resolve: {
         contestDetail: ['contestService', '$stateParams', function(contestService, $stateParams) {
            return  contestService.get({contest_id: $stateParams.contest_id}).$promise;
         }]
      },
   })
   .state('videos', {
	   url: '/videoer',
      template: '<ui-view/>',
      abstract: true
   })   
   .state('videos.list', {
         url: '/',
         resolve: {
            videos: function($http, APIURL) {
               return $http.get(APIURL + '/i/videos');
            }
         },
         controller: 'videosCtrl',
         templateUrl: assets_url + '/states/videos/tpls/videos-main.tpl.html'
   })
   .state('quizzes', {
      url: '/quizzer',
      template: '<ui-view/>',
      abstract:true
   })
   .state('quizzes.list', {
         url: '/',
         resolve: {
            quizzes: ['quizService', function(quizService){
               return quizService.query().$promise;
            }]
         },
         controller: 'quizzesCtrl',
         templateUrl: assets_url + '/states/quizzes/tpls/quizzes-main.tpl.html'
   });

}]);
