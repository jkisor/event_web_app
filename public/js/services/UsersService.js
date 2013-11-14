var services = angular.module('eventApp.services');

services.factory('UsersService', 
    function($resource) {
    	return $resource('/users', {}, {
    	   create: { method: 'POST' }
        });
    }
);