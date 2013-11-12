var app = angular.module('eventApp.controllers');

app.controller('EventDetailController', 
	function($scope, EventFactory, UserFactory, UserSessionService, $routeParams, $location) {

		$scope.deleteEvent = function (eventId) {
      		EventFactory.delete({ id: eventId });
      		$location.path('/events')
    	};

    	$scope.attendEvent = function() {
    		currentUser = UserSessionService.currentUser();
    		currentUser.events.push($scope.event);

    		UserFactory.update(currentUser);
    		//UserFactory.attend(cuser)
    		//UserSessionService.currentUser().events << $scope.event;
    		console.log("Attend! :" + currentUser.name);
    	};
    	$scope.showUser = function(userId) {
    		$location.path('/users/' + userId)
    	}

		$scope.event = EventFactory.show({id: $routeParams.id});
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