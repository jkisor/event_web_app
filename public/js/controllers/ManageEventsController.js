var module = angular.module('eventApp.controllers');

module.controller('ManageEventsController', 
	function($scope, $routeParams, $location, 
		EventService, UserService, SessionService, EventsService, User, Event) 
	{
		var events = $scope.events = [];
		EventsService.query(function(listOfEvents){
			for(var i = 0; i < listOfEvents.length; i++)
			{
				var event = new Event();
				angular.extend(event, listOfEvents[i]);
				var dateTime = event.datetime;
				event.date = extractDate(dateTime);
				event.time = extractTime(dateTime);

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
		
		$scope.cancel = function(eventId) 
		{
      		EventService.delete({ id: eventId },
      			function()
      			{
      				user.unattend(eventId);

      				events = [];
					EventsService.query(function(listOfEvents){
						for(var i = 0; i < listOfEvents.length; i++)
						{
							var e = new Event();
							angular.extend(e, listOfEvents[i]);

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

		var extractTime = function(dateTime)
		{
			if(dateTime == null)
				return "TBD";

			var dateEnd = dateTime.indexOf('T');
			var timeEnd = dateTime.indexOf('Z');
			return dateTime.substr(dateEnd+1, (timeEnd-dateEnd)-1);		
		}

		var extractDate = function(dateTime)
		{
			if(dateTime == null)
				return "TBD";

			var dateEnd = dateTime.indexOf('T');
			return dateTime.substr(0, dateEnd);		
		}
	}
);