var module = angular.module('eventApp.controllers')

module.controller('NewUserController', 
	function($scope, $location, UsersService) {
		$scope.createUser = function()
		{
			UsersService.create($scope.user, function(){
					console.log("User creation success.");
					$location.path('/events')
				},
				function() {
					console.log("User creation failed.")
				});
		}
	}
);