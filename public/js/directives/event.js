var module = angular.module('eventApp.directives')
module.directive('event', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: '/html/directives/event.html',
	}
});
