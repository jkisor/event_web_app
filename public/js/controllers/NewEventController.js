var module = angular.module('eventApp.controllers');

module.controller('NewEventController', 
	function($scope, EventsService, $location) {

		$scope.submit = function() {
			prepareDateTime();
		    EventsService.create($scope.event, 
		    	function() { 
		    		console.log("success!");
		    	},
		    	function() {
		    		console.log("failure!");
		    	});
		    $location.path('/events');
		}

		var prepareDateTime = function(){
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);