var services = angular.module('eventApp.services', ['ngResource', 'ngCookies']);

// var baseUrl = 'http://localhost\\:8080';
services.factory('EventsFactory', 
    function ($resource) { 
        return $resource('/events', {}, {
            query: { method: 'GET', isArray: true  },
            create: { method: 'POST' }
    })
});

services.factory('EventFactory', 
    function ($resource) {
        return $resource('/events/:id', {}, {
            show: { method: 'GET' },
            // update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: { id: '@id' } }
    });
});

services.factory('UsersFactory', 
    function($resource) {
    	return $resource('/users', {}, {
    	   create: { method: 'POST' }
        });
    }
);

services.factory('UserFactory',
    function($resource) {
        return $resource('/users/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: { id: '@id' } }
        });
    }

);

services.factory('SessionFactory', 
    function($resource) {
        return $resource('/signin', {}, {
            create: { method: 'POST' }
        });

    }
);

services.factory('UserSessionService', 
    function($cookieStore) {
        var currentUser = null;
        return {
            currentUser: function() { return currentUser },

            signIn: function(user) {
                currentUser = user;
                $cookieStore.put('remember_token', user.remember_token)
            },

            signOut: function() {
                $cookieStore.remove('remember_token')
                currentUser = null;
            }
        }
    }
);