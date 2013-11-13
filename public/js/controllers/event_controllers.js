var app = angular.module('eventApp.controllers');

app.controller('EventDetailController', 
	function($scope, EventFactory, UserFactory, UserSessionService, 
		User, Event, $routeParams, $location) {
		$scope.user = new User();
		$scope.event = new Event();

		//user
    	var u = UserSessionService.currentUser();
    	angular.extend($scope.user, u);

    	//event
		EventFactory.show({id: $routeParams.id}, function(e) {
			angular.extend($scope.event, e);
		});

		$scope.deleteEvent = function (eventId) {
      		EventFactory.delete({ id: eventId });
      		$location.path('/events')
    	};

    	$scope.attend = function() {
    		//Todo: update "event" too that the list in the view is updated
    		
    		// $scope.user.attend($scope.event);
    		// UserFactory.update($scope.user, renderUser);
    		$scope.event.register($scope.user);
    		EventFactory.update($scope.event, 
    			function(e) {
				angular.extend($scope.event, e);
			});

    	}

    	$scope.unattend = function() {

    		//Todo: update "event" too that the list in the view is updated
    		// $scope.user.unattend($scope.event);
    		// UserFactory.update($scope.user, renderUser);

    		$scope.event.unregister($scope.user);
    		EventFactory.update($scope.event, 
    			function(e) {
				angular.extend($scope.event, e);
			});
    	}

    	$scope.isUserAttending = function()
    	{
    		// doesnt update unregister/register button: find out why.
    	    //return user.isAttending($scope.event) > -1;
    		
    		//works in user verson
    		//return $scope.user.indexOfEvent($scope.event) > -1;

    		return $scope.event.indexOfUser($scope.user) > -1;
    	}

    	$scope.showUser = function(userId) {
    		$location.path('/users/' + userId)
    	}

    	var renderUser = function(userData)
    	{
    		angular.extend($scope.user, userData);
    	}

	}
);

app.controller('NewEventController', 
	function($scope, EventsFactory, $location){
		$scope.createEvent = function() {
		    EventsFactory.create($scope.event, 
		    	function() { 
		    		console.log("success!");
		    	},
		    	function() {
		    		console.log("failure!");
		    	});
		    $location.path('/events');
		}
	}
);


app.controller('EventsController', 
	function($scope, $location, EventsFactory, UserSessionService) {
		$scope.show = function(eventId) {
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

		$scope.showUser = function()
		{
			$location.path('/users/' + $scope.currentUser.id)
		}

		$scope.events = EventsFactory.query(); //successCallback, errorCallback
		$scope.currentUser = UserSessionService.currentUser();
	}
);