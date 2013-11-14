var services = angular.module('eventApp.services', ['ngResource', 'ngCookies']);

// var baseUrl = 'http://localhost\\:8080';
var User = function() {
    var self = this;

    this.events = [];
    this.attend = function(event)
    {
        this.events.push(event);
    }

    this.unattend = function(event) 
    {
        removeEvent(event);
    }

    this.isAttending = function(event) 
    {
        return this.indexOfEvent(event) > -1;
    }

    this.indexOfEvent = function(event)
    {
        for(var i = 0; i < this.events.length; i++)
        {
            if(this.events[i].id == event.id)
                return i;
        }       
        return -1;
    } 

    this.isAdmin = function()
    {
        console.log("admin? " + this.admin);
        return this.admin;
    }

    var removeEvent = function(event)
    {
        var index = self.indexOfEvent(event);
        if(index > -1)
            self.events.splice(index, 1);           
    }


};
services.value('User', User);


var Event = function() 
{
    var self = this;
    
    this.users = [];

    this.register = function(user) 
    {
        console.log("push to users");
        this.users.push(user);    
    };

    this.unregister = function(user) 
    {
        removeUser(user);
    };

    this.indexOfUser = function(user)
    {
        for(var i = 0; i < this.users.length; i++)
        {
            if(this.users[i].id == user.id)
                return i;
        }       
        return -1;
    } 

    var removeUser = function(user)
    {
        var index = self.indexOfUser(user);
        if(index > -1)
            self.users.splice(index, 1);           
    }
            
}

services.value('Event', Event);

/////////////
services.factory('EventsFactory', 
    function ($resource) { 
        return $resource('/events', {}, {
            query: { method: 'GET', isArray: true  },
            create: { method: 'POST' }
    })
});

services.factory('EventService', 
    function ($resource) {
        console.log("EventService");
        return $resource('/events/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
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

services.factory('UserService',
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
            setCurrentUser: function(u) { currentUser = u; },
            currentUser: function() { return currentUser },
            token: function() { return $cookieStore.get('remember_token') },
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