//historicDirective
angular.module('app')
    .directive('historicDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.contentOnHistoryPart = false;
    },
    templateUrl: 'views/directives/historicDirective.html'
  };
}]);
