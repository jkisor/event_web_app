var module = angular.module('eventApp.directives')
module.directive('event', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/templates/event.html',
	}
});
