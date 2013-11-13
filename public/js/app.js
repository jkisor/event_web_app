var eventApp = angular.module('eventApp', [
    'ngRoute', 
    'eventApp.services', 
    'eventApp.controllers', 
    'eventApp.directives', 
    'eventApp.filters'
]);

eventApp.config(function($routeProvider) {
    $routeProvider.when('/events', { controller: 'EventsController', templateUrl: 'partials/events/index.html' });
    $routeProvider.when('/events/new', { controller: 'NewEventController', templateUrl: 'partials/events/new.html' });
    $routeProvider.when('/events/:id', { controller: 'EventDetailController', templateUrl: 'partials/events/show.html' });
    $routeProvider.when('/users/:id', { controller: 'UserDetailController', templateUrl: 'partials/users/show.html' });
    
    $routeProvider.when('/signup', { controller: 'NewUserController', templateUrl: 'partials/users/signup.html' });
    $routeProvider.when('/signin', { controller: 'SigninController', templateUrl: 'partials/users/signin.html' })
    // $routeProvider.when('/users/:id', { controller: })
    $routeProvider.otherwise({ redirectTo: '/events' });
 });

eventApp.run(
	function run($rootScope, $route, $location, UserSessionService, SessionFactory) 
    {    
        var token = UserSessionService.token();

        if(token != null)
        {
            SessionFactory.create({token:token}, 
                function(response) 
                { 
                    UserSessionService.signIn(response);
                    $location.path('/events');
                },
                function() 
                {
                    console.log("sign in failure!");
                }
            );
        }



        $rootScope.$on('$locationChangeStart', 
            function(event, next, current) 
            { 
                console.log(next);
                if(UserSessionService.currentUser() == null)
                    $location.path('/signin');
            }
        );
    }
);
