var module = angular.module('eventApp.controllers');

module.controller('EditEventController', 
	function($scope, $routeParams, $location, $filter, 
		EventService, DateTimeExtractor)
	{
 		var event = $scope.event = new Event();

		EventService.show({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);

			var dateTime = $scope.event.datetime;
			var tool = new DateTimeExtractor();
			$scope.date = tool.extractDate(dateTime);
			$scope.time = tool.extractTime(dateTime);
		});

		$scope.submit = function()
		{
			console.log($scope.event);
			processDateTime();
			EventService.update($scope.event, 
				function(updatedEventData){
					$location.path('/events');
				},
				function(){
					console.log("save failed");
				}
			);
		}

		var processDateTime = function() {
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);