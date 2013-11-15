var module = angular.module('eventApp.directives');

module.directive('tabs', function() {
	return {
		restrict: 'E',
		transclude: true,
		controller: function($scope) {
			var panes = $scope.panes = [];
			$scope.select = function(pane) {
				angular.forEach(panes, function(pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function(pane) {
				if(panes.length == 0) {
					$scope.select(pane);
				}
				panes.push(pane);
			};
		},
		templateUrl: '/html/directives/tabs.html'
	};
});
