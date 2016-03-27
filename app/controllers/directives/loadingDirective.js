angular.module('app')
    .directive('loadingDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/loadingDirective.html'
  };
});
