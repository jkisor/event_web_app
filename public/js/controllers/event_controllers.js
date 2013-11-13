var app = angular.module('eventApp.controllers');

app.controller('EventDetailController', 
	function($scope, EventFactory, UserFactory, UserSessionService, 
				eventModel, userModel, $routeParams, $location) {
		var one = userModel;
		var two = userModel;
		console.log(userModel);
		console.log(one===two);

		//Current User
		var temp = userModel;
    	var u = UserSessionService.currentUser();
    	angular.extend(temp, u);
    	$scope.userModel = temp;

    	//Event
		$scope.eventModel = eventModel;

		EventFactory.show({id: $routeParams.id}, function(e) {
		 	eventModel = {};
			angular.extend(eventModel, e);
		 	$scope.eventModel = eventModel;
		});

		$scope.deleteEvent = function (eventId) {
      		EventFactory.delete({ id: eventId });
      		$location.path('/events')
    	};

    	$scope.attend = function(event) {
    		//Todo: update "event" too that the list in the view is updated
    		
    		//$scope.eventModel.register(userMode)
    		//var e = EventFactory.update($scope.eventModel)
    		//angular.extend($scope.eventModel, e);

    		$scope.userModel.attend($scope.eventModel);

    		var u = UserFactory.update($scope.userModel, 
    			function()
	    		{
		 			userModel = {};
    				angular.extend(userModel, u);
    				$scope.userModel = userModel;
	    		}
	    	);
    	}

    	$scope.unattend = function(event) {

    		//Todo: update "event" too that the list in the view is updated

    		$scope.userModel.unattend(event);

    		var u = UserFactory.update($scope.userModel, 
    			function()
	    		{
		 			userModel = {};
    				angular.extend(userModel, u);
    				$scope.userModel = userModel;
	    		}
    		);

    		// ? may have to reinstance the serivce
    	}

    	$scope.isUserAttending = function(user)
    	{
    		// doesnt update unregister/register button: find out why.
    	    //return user.isAttending($scope.eventModel) > -1;
    		return user.indexOfEvent($scope.eventModel) > -1;
    	}

    	$scope.showUser = function(userId) {
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