angular.module('app')
    .directive('playerPresentationDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.$watch(function() {
            return element.attr('desc');
        }, function(newValue) {
            scope.player = JSON.parse(newValue);
        });
    },
    templateUrl: 'views/directives/playerPresentationDirective.html'
  };
});
