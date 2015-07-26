angular.module('app.resources', ['ngResource'])
.factory('contestService', ['$resource', 'APIURL', function($resource, APIURL){

	return $resource(
		APIURL + '/i/contests/:contest_id/:action', 
		{contest_id: "@contest_id"}, 
		{
			'query': {
				method: 'GET', isArray: false 
			},
			'answer' : {
				method: 'POST', 
				params: {
					action: 'answer'
				}
			} 
		}
	);

}])
.factory('artistService', ['$resource', 'APIURL', function($resource, APIURL){

	return $resource(
		APIURL + '/i/artist/:artist_slug/:action/:action_slug', 
		{artist_slug: "@artist_slug"}, 
		{
			'query': {
				method: 'GET', isArray: false 
			}
		}
	);

}])
.factory('quizService', ['$resource', 'APIURL', function($resource, APIURL){

	return $resource(
		APIURL + '/i/quizzes', 
		{}, 
		{
			'query': {
				method: 'GET', isArray: false 
			}
		}
	);

}])
.factory('homeService', ['$resource', 'APIURL',  function($resource, APIURL){
	return $resource(APIURL + '/i/general', 
		{},
		{'query': { method: 'GET', isArray: false }
		});
}]);