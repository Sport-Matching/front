angular.module('app')
    .directive('playerDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.contentOnHistoryTournamentPart = false;
    },
    templateUrl: 'views/directives/playerDirective.html'
  };
}]);
