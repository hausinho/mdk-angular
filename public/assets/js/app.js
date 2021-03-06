// var APIURL = (location.hostname === 'localhost') ? 'http://localhost:2100' : 'https://devapi.musik.dk';
var APIURL = 'https://api.musik.dk';

angular.module('app', [
    'ui.router', 
    'ui.bootstrap',
    'ngSanitize',
    'dialogs.main',
    'LocalStorageModule',
    'app.home',
    'app.artists',
    'app.videos',
    'app.quizzes',
	'app.contests',
    'app.resources',
    'app.services',
	'app.directives',
	'app.filters',
    'app.modals',
    'angularMoment',
    'musikdkModalModule'
])
.value('$anchorScroll', angular.noop)
.constant('APIURL', APIURL)
.config(['$httpProvider', 'localStorageServiceProvider', function ($httpProvider, localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('musikdk');
    $httpProvider.interceptors.push('httpJWT');
}])
.run([
    '$rootScope', 
    '$state', 
    '$stateParams',
    function(
        ParseService, 
        $rootScope,   
        $state,   
        $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // $rootScope.isViewLoading = true;    

    console.log('initialized');
    

}]);
