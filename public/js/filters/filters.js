var filters = angular.module('eventApp.filters', []);

filters.filter('availableEvents', function() {
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