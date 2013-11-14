
app.controller('EventsController', 
	function($scope, $location, EventsFactory, UserSessionService) {
		$scope.show = function(eventId) 
		{
			$location.path('/events/'+eventId)
		}

		$scope.newEvent = function()
		{
			$location.path('/events/new')
		}

		$scope.newUser = function()
		{
			$location.path('/signup')
		}

		$scope.signIn = function()
		{
			$location.path('/signin')
		}

		$scope.signOut = function()
		{
			UserSessionService.signOut();
			$scope.signIn();
		}

		$scope.showUser = function()
		{
			$location.path('/users/' + $scope.currentUser.id)
		}

		$scope.events = EventsFactory.query(); //successCallback, errorCallback
		$scope.currentUser = UserSessionService.currentUser();
	}
);
