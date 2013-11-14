var module = angular.module('eventApp.filters', []);

module.filter('availableEvents', function() {
	return function(events, user) {
		var availableEvents = [];
		for(var i = 0; i < events.length; i++)
		{
			var event = events[i];
			if(!user.isAttending(event))
				availableEvents.push(event);
		}
		return availableEvents;
	}	
})

module.filter('attendedBy', function() {
	return function(events, user) {
		var userEvents = [];
		for(var i = 0; i < events.length; i++)
		{
			var event = events[i];
			if(user.isAttending(event))
				userEvents.push(event);
		}
		return userEvents;
	}	
})