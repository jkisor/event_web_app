var module = angular.module('eventApp.controllers')

module.controller('NewUserController', 
	function($scope, $location, UsersService) {
		$scope.createUser = function()
		{
			UsersService.create($scope.user);
			$location.path('/events')
		}
	}
);