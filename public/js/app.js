var baseUrl = "http://localhost:9393/#";

//Modules

//App
var eventApp = angular.module('eventApp', [
    'ngRoute', 
    'eventApp.services', 
    'eventApp.controllers', 
    'eventApp.directives', 
    'eventApp.filters'
]);

//Models
eventApp.value('User', User);
eventApp.value('Event', Event)


//Routes
eventApp.config(function($routeProvider) {
    $routeProvider.when('/events', { controller: 'ManageEventsController', templateUrl: 'partials/events/index.html' });
    $routeProvider.when('/events/new', { controller: 'NewEventController', templateUrl: 'partials/events/new.html' });
    $routeProvider.when('/events/:id', { controller: 'EditEventController', templateUrl: 'partials/events/edit.html' });
    $routeProvider.when('/signup', { controller: 'NewUserController', templateUrl: 'partials/users/signup.html' });
    $routeProvider.when('/signin', { controller: 'SigninController', templateUrl: 'partials/users/signin.html' })

    $routeProvider.otherwise({ redirectTo: '/events' });
 });


eventApp.run(
	function run($rootScope, $route, $location, SessionService, SignInService) 
    {    
        var token = SessionService.token();

        if(token != null)
        {
            SignInService.create({token:token}, 
                function(response) 
                { 
                    SessionService.signIn(response);
                    $location.path('/events');
                },
                function() 
                {
                    console.log("Signin failed.");
                }
            );
        }

        $rootScope.$on('$locationChangeStart', 
            function(event, next, current) 
            { 
                if(next == (baseUrl + "/signup"))
                    return;   

                if(SessionService.currentUser() == null)
                    $location.path('/signin');
            }
        );
    }
);
