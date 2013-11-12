var eventApp = angular.module('eventApp', ['ngRoute', 'eventApp.services', 'eventApp.controllers'])

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
	function run() {
        // if(!SessionService.isSignedIn())
        // 	$location.path('/signin')
        // else
        // 	SessionService.sign_in
    }
);

//eventApp.run(
	//function run(SessionService, UserRestService) {
        // var _user = UserRestService.requestCurrentUser();
        // SessionService.setCurrentUser(_user);
//});
