var services = angular.module('eventApp.services');

services.factory('SignInService', 
    function($resource) {
        return $resource('/signin', {}, {
            create: { method: 'POST' }
        });

    }
);

