var app = angular.module('eventApp.controllers');

app.controller('EditEventController', 
	function($scope, $routeParams, $location, EventService)
	{
 		var event = $scope.event = new Event();

		EventService.show({id: $routeParams.id}, function(e) 
		{
			angular.extend($scope.event, e);

			var dateTime = $scope.event.datetime;
			$scope.date = extractDate(dateTime);
			$scope.time = extractTime(dateTime);
		});

		$scope.submit = function()
		{
			console.log($scope.event);
			processDateTime();
			EventService.update($scope.event, 
				function(updatedEventData){
					$location.path('/events');
				},
				function(){
					console.log("save failed");
				}
			);
		}

		var extractTime = function(dateTime)
		{
			var dateEnd = dateTime.indexOf('T');
			var timeEnd = dateTime.indexOf('Z');
			return dateTime.substr(dateEnd+1, (timeEnd-dateEnd)-1);		
		}

		var extractDate = function(dateTime)
		{
			var dateEnd = dateTime.indexOf('T');
			return dateTime.substr(0, dateEnd);		
		}

		var processDateTime = function() {
			$scope.event.datetime = $scope.date + " " + $scope.time;
		}
	}
);

app.controller('NewEventController', 
	function($scope, EventsService, $location){
		$scope.submit = function() {
			processDateTime();
		    EventsService.create($scope.event, 
		    	function() { 
		    		console.log("success!");
		    	},
		    	function() {
		    		console.log("failure!");
		    	});
		    $location.path('/events');
		}

		var processDateTime = function(){
			$scope.event.datetime = $scope.date + " " + $scope.time;
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

  //   	$scope.show = function(eventId) 
		// {
		// 	$location.path('/events/'+eventId)
		// }

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
      				// TODO: maybe not do this.
      				user.unattend(eventId);
      				// $location.path('/') // quick way to refresh... reroute to page
      				events = [];
					EventsService.query(function(listOfEvents){
						for(var i = 0; i < listOfEvents.length; i++)
						{
							var e = new Event();
							angular.extend(e, listOfEvents[i]);

							events.push(e);
						}
						// $scope.events = events;
      					updateView();

					});

      			}
      		);
      		// $location.path('/events')
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