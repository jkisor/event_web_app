var module = angular.module('eventApp.directives');

module.directive('pane', function() {
	return {
		require: '^tabs',
		restrict: 'E',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, tabsController) {
			tabsController.addPane(scope);
		},
		templateUrl: '/html/directives/pane.html'
	};
});
