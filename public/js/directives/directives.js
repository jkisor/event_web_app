var module = angular.module('eventApp.directives', []);
module.directive('rsvpGreeting', function(){
  return {
    // use templateUrl to break up into individual html files
      //works like ngInclude
    //or inline the html using 'template'
    templateUrl: '/templates/rsvp-greeting.html'
  }
});

module.directive('rsvpTabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };
 
        this.addPane = function(pane) {
          if (panes.length == 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        };
      },
      templateUrl: '/templates/rsvp-tabs.html'
    };
  })

module.directive('rsvpPane', function() {
  return {
    require: '^rsvpTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsController) {
      tabsController.addPane(scope);
    },
    templateUrl: '/templates/rsvp-pane.html'
  };
});