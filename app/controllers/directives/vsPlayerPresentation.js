angular.module('app')
    .directive('vsPlayerPresentation', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.$watch(function() {
            return element.attr('players');
        }, function(newValue) {
            if (attrs.players !== undefined && attrs.players != "") {
                scope.players = JSON.parse(attrs.players);
            } else {
                scope.players = {};
            }
        });
    },
    templateUrl: 'views/directives/vsPlayerPresentation.html'
  };
});
