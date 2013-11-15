var services = angular.module('eventApp.services');

services.factory('EventService', 
    function ($resource) {
        return $resource('/events/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: { id: '@id' } }
    });
});