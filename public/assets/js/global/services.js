angular.module('app.services', [])
.factory('httpJWT', ['localStorageService', '$q', '$location', '$rootScope', function (localStorageService, $q, $location, $rootScope) {
  return {
  	responseError: function(rejection){
  		if (rejection.status === 401) {

  			localStorageService.remove('jwt-token');
  			localStorageService.remove('user');
  			$rootScope.user = null;
  			hello.logout();

  		}
  		return $q.reject(rejection);
  	},
    request: function (req) {

    	// // check if we have a token active
    	if(localStorageService.get('jwt-token')) {
    		req.headers['Authorization'] = 'Bearer '+localStorageService.get('jwt-token');
    	}
      	return req;
    }
  };
}])
.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});