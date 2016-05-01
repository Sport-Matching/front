angular.module('app')
    .directive('vsStatDirective', [function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/vsStatDirective.html'
  };
}]);
