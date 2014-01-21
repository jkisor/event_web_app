var services = angular.module('eventApp.services');

services.factory('UserService',
    function($resource) {
        return $resource('/users/:id', {}, {
            update: { method: 'PUT', params: { id: '@id' } }
        });
    }

);