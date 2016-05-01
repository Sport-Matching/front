angular.module('app')
    .directive('playerPresentationDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.player = JSON.parse(attrs.player);
    },
    templateUrl: 'views/directives/playerPresentationDirective.html'
  };
});
