var app = angular.module('eventApp.controllers');

// app.controller('EventDetailController', 
// 	function($scope, $routeParams, $location, 
// 		EventService, SessionService, User, Event) 
// 	{
// 		var event = $scope.event = new Event();

// 		//user
// 		var user = new User();
//     	var u = SessionService.currentUser();
//     	angular.extend(user, u);
//     	$scope.user = user;

//     	//event
// 		EventService.show({id: $routeParams.id}, function(e) 
// 		{
// 			angular.extend($scope.event, e);
// 		});

// 		$scope.deleteEvent = function (eventId) 
// 		{
//       		EventService.delete({ id: eventId });
//       		$location.path('/events')
//     	};

// 		$scope.attend = function() {
// 			event.register(user);

// 			EventService.update(event, 
// 				function(e) {
// 				angular.extend($scope.event, e);
// 			});
// 			// SessionService.setCurrentUser(user);

// 		}

//     	$scope.unattend = function() 
//     	{
//     		event.unregister(user);

//     		EventService.update(event, 
//     			function(e) {
// 				angular.extend($scope.event, e);
// 			});
// 			// SessionService.setCurrentUser(user);

//     	}

//     	$scope.isUserAttending = function()
//     	{
//     		return event.indexOfUser(user) > -1;
//     	}

//     	$scope.showUser = function(userId) 
//     	{
//     		$location.path('/users/' + userId)
//     	}
// 	}
// );

app.controller('EditEventController', 
	function($scope, $routeParams, $location, EventService)
	{
 		var event = $scope.event = new Event();

		EventService.show({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);
		});

		$scope.save = function()
		{
			console.log($scope.event);

			EventService.update($scope.event, 
				function(updatedEventData){
					// console.log(updatedEventData);
					$location.path('/events');
				},
				function(){
					console.log("save failed");
				}
			);
		}
	}
);

app.controller('NewEventController', 
	function($scope, EventsService, $location){
		$scope.createEvent = function() {
		    EventsService.create($scope.event, 
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
		EventService, UserService, SessionService, EventsService, User, Event) 
	{
		var events = $scope.events = [];
		EventsService.query(function(listOfEvents){
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
    	var u = SessionService.currentUser();
    	angular.extend(user, u);
    	$scope.user = user;

    	$scope.permission = {
         	admin: user.isAdmin()
     	}


		$scope.attend = function(event) {
			user.attend(event);

			UserService.update(user, 
				function(updatedUserData) {
					angular.extend(user, updatedUserData);
					SessionService.setCurrentUser(user); //

					event.register(updatedUserData);
					updateView();				
				}
			);

		}

    	$scope.unattend = function(event) 
    	{
			user.unattend(event);

			UserService.update(user, 
				function(updatedUserData) {
					angular.extend(user, updatedUserData);
					SessionService.setCurrentUser(user); //

					event.unregister(updatedUserData);
					updateView();
				}
			);
    	}

    	$scope.show = function(eventId) 
		{
			$location.path('/events/'+eventId)
		}

		$scope.signOut = function()
		{
			SessionService.signOut();
			$location.path('/signin');
		}

		$scope.printEvent = function(event)
		{
			console.log(event);
		}

		$scope.createEvent = function() {
		    $location.path('/events/new');
		}

		$scope.edit = function(eventId) {
			$location.path('/events/' + eventId);
		}
		var updateView = function()
		{
			$scope.user = user;
			$scope.events = events;
		}
	}
);