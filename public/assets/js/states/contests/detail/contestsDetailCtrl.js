angular.module('app.contests')
.controller('contestsDetailCtrl', [
	'$scope', 
	'$http', 
	'contestDetail', 
	'contestService', 
	'$sce', 
	'musikdkModal',
	function($scope, $http, contestDetail, contestService, $sce, musikdkModal){
	
	var data = contestDetail.data;

	$scope.contest = data;
	$scope.contest.description = $sce.trustAsHtml(data.description);


	// Text contest functions
	$scope.clickedAnswer = function(answer){


		// Inform if the contest is already answered.
		if($scope.contest.question.answered) {
			return musikdkModal.showModal({
				templateUrl: "/assets/js/global/modals/tpls/contests/error.html",
			}, data.artist);
		}

		var answerReq = new contestService.answer({
			answer_id: answer.answer_id,
			question_id: data.question.contest_question_id,  
			contest_id: data.contest_id
		}).$promise;

		answerReq.then(function(res){

			$scope.contest.question.answered = answer;
			musikdkModal.showModal({
				templateUrl: "/assets/js/global/modals/tpls/contests/answered.html",
			}, data.artist);

		});

	};
	

}]);