var eventApp = angular.module('eventApp',[])

function EventsController($scope) {
	$scope.events = [ {name:"Metal Concert", status:"available"},
					  {name:"Party", status:"attending"}];
}
// eventApp.controller('EventsController', function($scope, $http)) {
// 	$scope.events = [ {name:"Metal Concert", status:"available"},
// 					  {name:"Party", status:"attending"}]
// }