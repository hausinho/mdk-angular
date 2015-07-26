angular.module('app.directives', [])
.directive('fadeoutTxt', ['$timeout', function ($timeout) {
	
	return {
		restrict: 'A',
		link: {
			post: function(scope, element){

				// Check on next loop
				$timeout(function(){
					if(element.children()[1].offsetHeight < 130) return;
					element.append('<div class="ct_fader"></div>');
				});

			}
		} 
		
	};

}]);