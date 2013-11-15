var module = angular.module('eventApp.directives')
module.directive('adminButtons', function() {
	return {
		restrict: 'E',
		templateUrl: '/templates/rsvp-admin-buttons.html'
	}
});