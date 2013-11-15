var module = angular.module('eventApp.filters');

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