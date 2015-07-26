angular.module('app.quizzes', [])
.controller('quizzesCtrl', ['$scope', 'quizzes', function($scope, quizzes){

	// Get the data from the promise resolved.
	var data = quizzes.data;
	$scope.featured = data[Math.floor(Math.random() * data.length)];
	$scope.quizzes = data;


}])
.controller('quizzesDetailCtrl', ['$scope', 'quiz', function($scope, quiz){
	
	$scope.quiz = quiz.data;
	
}]);