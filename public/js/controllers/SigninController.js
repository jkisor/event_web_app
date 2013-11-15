var module = angular.module('eventApp.controllers')

module.controller('SigninController',
	function($scope, $location, SignInService, SessionService) {
		$scope.createSession = function() {
			var credentials = $scope.credentials;

		    SignInService.create($scope.credentials, 
		    	function(response) { 
		    		console.log("sign in success!");
		    		
		    		SessionService.signIn(response);

		    		$location.path('/events');

		    	},
		    	function() {
		    		console.log("sign in failure!");
		    	});
		}

		$scope.createAccount = function() {
			$location.path("/signup")
		}
	}
);