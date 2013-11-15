var module = angular.module('eventApp.controllers');

module.controller('EditEventController', 
	function($scope, $routeParams, $location, $filter, EventService)
	{
 		var event = $scope.event = new Event();

		EventService.show({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);

			var dateTime = $scope.event.datetime;
			$scope.date = extractDate(dateTime);
			$scope.time = extractTime(dateTime);
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

		var extractTime = function(dateTime)
		{
			if(dateTime == null)
				return "";

			var dateEnd = dateTime.indexOf('T');
			var timeEnd = dateTime.indexOf('Z');
			return dateTime.substr(dateEnd+1, (timeEnd-dateEnd)-1);		
		}

		var extractDate = function(dateTime)
		{
			if(dateTime == null)
				return "";
			
			var dateEnd = dateTime.indexOf('T');
			return dateTime.substr(0, dateEnd);		
		}

		var processDateTime = function() {
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);