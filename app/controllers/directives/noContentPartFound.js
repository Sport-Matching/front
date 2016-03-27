angular.module('app')
    .directive('noContentPartFound', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/noContentPartFound.html'
  };
});
