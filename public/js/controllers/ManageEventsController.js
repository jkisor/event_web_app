var module = angular.module('eventApp.controllers');

module.controller('ManageEventsController', 
	function($scope, $routeParams, $location, 
		EventService, UserService, SessionService, 
		EventsService, User, Event, DateTimeExtractor) 
	{
		var events = $scope.events = [];
		EventsService.all(function(listOfEvents){
			for(var i = 0; i < listOfEvents.length; i++)
			{
				var event = new Event();
				angular.extend(event, listOfEvents[i]);

				var dateTime = event.datetime;
				var tool = new DateTimeExtractor();
				event.date = tool.extractDate(dateTime);
				event.time = tool.extractTime(dateTime);

				events.push(event);
			}
			$scope.events = events;

		});

		var user = new User();
    	angular.extend(user, SessionService.currentUser());
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

		$scope.signOut = function()
		{
			SessionService.signOut();
			$location.path('/signin');
		}

		$scope.createEvent = function() {
		    $location.path('/events/new');
		}

		$scope.edit = function(eventId) {
			$location.path('/events/' + eventId);
		}
		
		$scope.cancel = function(event) 
		{
      		EventService.delete({ id: event.id },
      			function()
      			{
      				user.unattend(event);

      				events = [];
					EventsService.all(function(listOfEvents){
						for(var i = 0; i < listOfEvents.length; i++)
						{
							var e = new Event();
							angular.extend(e, listOfEvents[i]);

							var dateTime = e.datetime;
							var tool = new DateTimeExtractor();
							e.date = tool.extractDate(dateTime);
							e.time = tool.extractTime(dateTime);

							events.push(e);
						}
      					updateView();
					});

      			}
      		);
    	};

		var updateView = function()
		{
			$scope.user = user;
			$scope.events = events;
		};
	}
);