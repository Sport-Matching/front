angular.module('app')
    .directive('noContentDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/noContentDirective.html'
  };
});
