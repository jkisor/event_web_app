var module = angular.module('eventApp.directives')
module.directive('event', function($filter) {
	return {
		templateUrl: '/templates/event.html',
	}
});