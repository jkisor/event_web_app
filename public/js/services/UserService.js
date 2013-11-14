var services = angular.module('eventApp.services');

services.factory('UserService',
    function($resource) {
        return $resource('/users/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: { id: '@id' } }
        });
    }

);