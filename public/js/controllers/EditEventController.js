var module = angular.module('eventApp.controllers');

module.controller('EditEventController', 
	function($scope, $routeParams, $location, $filter, 
		EventService, DateTimeExtractor)
	{
 		var event = $scope.event = new Event();

		EventService.find({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);

			var dateTime = $scope.event.datetime;
			var tool = new DateTimeExtractor();
			$scope.date = tool.extractDate(dateTime);
			$scope.time = tool.extractTime(dateTime);
		});

		$scope.submit = function()
		{
			prepareDateTime();
			EventService.update($scope.event, 
				function(updatedEventData){
					$location.path('/events');
				},
				function(){
					console.log("save failed");
				}
			);
		}

		var prepareDateTime = function() {
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);