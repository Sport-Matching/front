angular.module('app')
    .directive('playerPresentationDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.player = {img: "./img/nadal.jpg", name: "Rafael NADAL", nation: "ES", age: 29, birthday: "3 June 1986", weight: "1.85m", favorySurface: "Clay"};
    },
    templateUrl: 'views/directives/playerPresentationDirective.html'
  };
});
