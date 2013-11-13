var app = angular.module('eventApp.controllers', [])

app.controller('UserDetailController',
	function($scope, $location, $routeParams, UserService) {

		$scope.viewEvent = function(eventId)
		{
			$location.path('/events/'+eventId)
		}
		$scope.user = UserService.show({id: $routeParams.id});
	}
);

app.controller('NewUserController', 
	function($scope, $location, UsersFactory) {
		$scope.createUser = function()
		{
			UsersFactory.create($scope.user);
			$location.path('/events')
		}
	}
);

app.controller('SigninController',
	function($scope, $location, SessionFactory, UserSessionService) {
		$scope.createSession = function() {
			var credentials = $scope.credentials;

			// console.log(credentials.username)
			// console.log(credentials.password)

		    SessionFactory.create($scope.credentials, 
		    	function(response) { 
		    		// console.log("sign in success! :" + response.remember_token);
		    		
		    		UserSessionService.signIn(response);
		    		// console.log("From token service: " + UserSessionService.currentUser().name);
		    		
		    		$location.path('/events');

		    	},
		    	function() {
		    		console.log("sign in failure!");
		    	});
		}
	}
);

app.controller('NavBarController', 
	function($scope, $location, UserSessionService) {
		$scope.newUser = function() {
			$location.path('/signup')
		}

		$scope.signIn = function() {
			$location.path('/signin')
		}

		$scope.showUser = function() {
			$location.path('/users/' + $scope.currentUser.id)
		}
		
		$scope.currentUser = UserSessionService.currentUser();
	}
);