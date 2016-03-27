angular.module('app')
    .directive('historyLineDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.playerName = attrs.playerName;
        scope.firstSet = attrs.firstSet;
        scope.secondSet = attrs.secondSet;
        scope.thirdSet = attrs.thirdSet;
        scope.fourthSet = attrs.fourthSet;
        scope.fifthSet = attrs.fifthSet;
    },
    templateUrl: 'views/directives/historyLineDirective.html'
  };
});
