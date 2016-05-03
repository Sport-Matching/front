angular.module('app')
    .directive('vsPlayerPresentation', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        if (attrs.players !== undefined) {
            scope.players = JSON.parse(attrs.players);
        } else {
            scope.players = {};
        }
    },
    templateUrl: 'views/directives/vsPlayerPresentation.html'
  };
});
