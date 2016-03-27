//historicDirective
angular.module('app')
    .directive('historicDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.contentOnHistoryPart = true;
    },
    templateUrl: 'views/directives/historicDirective.html'
  };
}]);
