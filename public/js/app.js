var baseUrl = "http://localhost:9393/#";

//Modules
angular.module('eventApp.controllers', [])
angular.module('eventApp.directives', [])
angular.module('eventApp.services', ['ngResource', 'ngCookies'])
angular.module('eventApp.filters', [])

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
eventApp.value('DateTimeExtractor', DateTimeExtractor)



//Routes
eventApp.config(function($routeProvider) {
    $routeProvider.when('/events', { controller: 'ManageEventsController', templateUrl: 'html/events/index.html' });
    $routeProvider.when('/events/new', { controller: 'NewEventController', templateUrl: 'html/events/new.html' });
    $routeProvider.when('/events/:id', { controller: 'EditEventController', templateUrl: 'html/events/edit.html' });
    $routeProvider.when('/signup', { controller: 'NewUserController', templateUrl: 'html/users/signup.html' });
    $routeProvider.when('/signin', { controller: 'SigninController', templateUrl: 'html/users/signin.html' })

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
