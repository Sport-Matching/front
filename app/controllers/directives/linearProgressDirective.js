angular.module('app')
    .directive('linearProgressDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.title = attrs.linearTitle;
        scope.idLinear = attrs.idLinear;
    },
    templateUrl: 'views/directives/linearProgressDirective.html'
  };
});
