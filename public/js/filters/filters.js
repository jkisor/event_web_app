var filters = angular.module('eventApp.filters', []);

filters.filter('reverse', function() {
	return function(text) {
		return text.split("").reverse().join("");
	}	
})