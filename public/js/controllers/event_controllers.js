var app = angular.module('eventApp.controllers');

app.controller('EventDetailController', 
	function($scope, $routeParams, $location, 
		EventService, UserSessionService, User, Event) 
	{
		var event = $scope.event = new Event();

		//user
		var user = new User();
    	var u = UserSessionService.currentUser();
    	angular.extend(user, u);
    	$scope.user = user;

    	//event
		EventService.show({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);
		});

		$scope.deleteEvent = function (eventId) 
		{
      		EventService.delete({ id: eventId });
      		$location.path('/events')
    	};

		$scope.attend = function() {
			event.register(user);

			EventService.update(event, 
				function(e) {
				angular.extend($scope.event, e);
			});
			// UserSessionService.setCurrentUser(user);

		}

    	$scope.unattend = function() 
    	{
    		event.unregister(user);

    		EventService.update(event, 
    			function(e) {
				angular.extend($scope.event, e);
			});
			// UserSessionService.setCurrentUser(user);

    	}

    	$scope.isUserAttending = function()
    	{
    		return event.indexOfUser(user) > -1;
    	}

    	$scope.showUser = function(userId) 
    	{
    		$location.path('/users/' + userId)
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
	function($scope, $routeParams, $location, 
		EventService, UserService, UserSessionService, EventsFactory, User, Event) 
	{

		var events = $scope.events = [];
		EventsFactory.query(function(listOfEvents){
			for(var i = 0; i < listOfEvents.length; i++)
			{
				var e = new Event();
				angular.extend(e, listOfEvents[i]);
				events.push(e);
			}
			$scope.events = events;

		});
		//user
		var user = new User();
    	var u = UserSessionService.currentUser();
    	angular.extend(user, u);
    	$scope.user = user;


		$scope.attend = function(event) {
			user.attend(event);
			UserService.update(user, 
				function(updatedUser) {
					angular.extend(user, updatedUser);
					updateView();
					UserSessionService.setCurrentUser(user); //
				}
			);
		}

    	$scope.unattend = function(event) 
    	{
			user.unattend(event);
			UserService.update(user, 
				function(updatedUser) {
					angular.extend(user, updatedUser);
					updateView();
					UserSessionService.setCurrentUser(user); //
				}
			);
    	}

    	$scope.show = function(eventId) 
		{
			$location.path('/events/'+eventId)
		}

		$scope.signOut = function()
		{
			UserSessionService.signOut();
			$location.path('/signin');
		}

		var updateView = function()
		{
			$scope.user = user;
		}
	}
);