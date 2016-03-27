angular.module('app')
    .directive('playerPresentationDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/playerPresentationDirective.html'
  };
});
