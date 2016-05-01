angular.module('app')
    .directive('vsPlayerPresentation', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
    },
    templateUrl: 'views/directives/vsPlayerPresentation.html'
  };
});
