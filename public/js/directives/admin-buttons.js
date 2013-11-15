var module = angular.module('eventApp.directives')
module.directive('adminButtons', function() {
	return {
		restrict: 'E',
		templateUrl: '/html/directives/admin-buttons.html'
	}
});