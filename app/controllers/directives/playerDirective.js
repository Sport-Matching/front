angular.module('app')
    .directive('playerDirective', [function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.$watch(function() {
            return element.attr('player');
        }, function(newValue) {
            if (attrs.player !== undefined && attrs.player !== "") {
                scope.player = JSON.parse(newValue);
            } else {
                scope.player = {
                    description: {},
                    predicts: [],
                    stats: {},
                    histo: []
                };
            }
        });
    },
    templateUrl: 'views/directives/playerDirective.html'
  };
}]);
