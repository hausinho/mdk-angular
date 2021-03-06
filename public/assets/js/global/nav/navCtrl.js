angular.module('app')
.controller('navCtrl', [
	'$scope', 
	'$rootScope', 
	'$state',
	'$http', 
	'APIURL', 
	'localStorageService', 
	'musikdkModal',
	function($scope, $rootScope, $state, $http, APIURL, localStorageService, musikdkModal){
	
	// Get current state
    $rootScope.$state = $state;

	if(localStorageService.get('user')) $rootScope.user = localStorageService.get('user');

	// Show modal
	$scope.login = function(){

		musikdkModal.showModal({
			templateUrl: "/assets/js/global/modals/tpls/auth/login.html",
			controller: 'modalLoginCtrl'
		}, {})
		.then(function(result){

			console.log(result);

		});

	};

	$scope.logOut = function(){

		hello.logout();
		localStorageService.remove('jwt-token');
		localStorageService.remove('user');
		$rootScope.user = null;	
		
	};

}]);