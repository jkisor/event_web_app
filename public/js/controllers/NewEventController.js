var module = angular.module('eventApp.controllers');

module.controller('NewEventController', 
	function($scope, EventsService, $location) {

		// defaultDateTimeToNow();

		$scope.submit = function() {
			processDateTime();
		    EventsService.create($scope.event, 
		    	function() { 
		    		console.log("success!");
		    	},
		    	function() {
		    		console.log("failure!");
		    	});
		    $location.path('/events');
		}

		// var defaultDateTimeToNow = function()
		// {
		// 	defaultDateToToday();
		// 	// defaultTimeToNow();


		// }
		// var defaultDateToToday = function()
		// {
		// 	var today = new Date();
		// 	var day = today.getDate();
		// 	var month = today.getMonth()+1;

		// 	var year = today.getFullYear();
		// 	if(day<10)
		// 		day='0'+day
		// 	if(month<10)
		// 		month='0'+month

		// 	$scope.date = year+'-'+month+'-'+day;	
		// }

		// var defaultTimeToNow = function()
		// {
		// 	var hours = new Date
		// 	$scope.time = today.getTime();

		// }

		var processDateTime = function(){
			console.log($scope.date);
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);