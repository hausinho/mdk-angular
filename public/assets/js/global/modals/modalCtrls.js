angular.module('app.modals', [])
.controller('modalLoginCtrl', ['$scope', '$rootScope', '$http', 'localStorageService', '$modalInstance', function($scope, $rootScope, $http, localStorageService, $modalInstance){

	// Check for hello login event
	hello.on('auth.login', function(acct){

		if(!$rootScope.user) {
			$http.post(APIURL + '/i/auth/login', {
			    provider: acct.network, 
			    access_token: acct.authResponse.access_token,
			    client_id: acct.authResponse.client_id
			})
			.then(function(res){

				localStorageService.set('jwt-token', res.data.token);
				$http.get(APIURL + '/i/user/me')
				.then(function(res){
					localStorageService.set('user', res.data.data);
					$rootScope.user = res.data.data;
					$modalInstance.dismiss('cancel');
				});

			});
		}

	});	

	$scope.close = function(){
		$modalInstance.dismiss('cancel');
	};
	
}]);