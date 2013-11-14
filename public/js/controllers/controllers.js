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
	function($scope, $location, UsersService) {
		$scope.createUser = function()
		{
			UsersService.create($scope.user);
			$location.path('/events')
		}
	}
);

app.controller('SigninController',
	function($scope, $location, SignInService, SessionService) {
		$scope.createSession = function() {
			var credentials = $scope.credentials;

			// console.log(credentials.username)
			// console.log(credentials.password)

		    SignInService.create($scope.credentials, 
		    	function(response) { 
		    		// console.log("sign in success! :" + response.remember_token);
		    		
		    		SessionService.signIn(response);
		    		// console.log("From token service: " + SessionService.currentUser().name);
		    		
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

app.controller('NavBarController', 
	function($scope, $location, SessionService) {
		$scope.newUser = function() {
			$location.path('/signup')
		}

		$scope.signIn = function() {
			$location.path('/signin')
		}

		$scope.showUser = function() {
			$location.path('/users/' + $scope.currentUser.id)
		}
		
		$scope.currentUser = SessionService.currentUser();
	}
);