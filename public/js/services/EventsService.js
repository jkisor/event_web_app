var services = angular.module('eventApp.services');
services.factory('EventsService', 
    function ($resource) { 
        return $resource('/events', {}, {
            all: { method: 'GET', isArray: true  },
            create: { method: 'POST' }
    })
});
