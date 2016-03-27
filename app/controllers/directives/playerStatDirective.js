//playerStatDirective
angular.module('app')
    .directive('playerStatDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        function generatePlayerStatView(color, valueMatchWin, valueQuartWin, valueDemiWin, valueFinalWin, valueFirstSetWin) {
            $timeout(function() {
                radialProgress(document.getElementById('player-stat-content-body-radial-main'), color)
                    .label("MATCH WIN")
                    .diameter(180)
                    .value(valueMatchWin)
                    .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-quart'), color)
                    .label("QUART WIN")
                    .diameter(120)
                    .value(valueQuartWin)
                    .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-demi'), color)
                    .label("DEMI WIN")
                    .diameter(120)
                    .value(valueDemiWin)
                    .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-final'), color)
                    .label("FINAL WIN")
                    .diameter(120)
                    .value(valueFinalWin)
                    .render();

                progressLine(document.getElementById('player-stat-content-body-linear-cnt'), color, false, "rgb(215, 215, 215)")
                    .valueLeft(valueFirstSetWin);
            }, 0);
        }

        scope.clickHardCourtsButton = function() {
            generatePlayerStatView("rgb(75, 165, 240)", 25, 28, 23, 12, 33);
        };
        scope.clickClayCourtsButton = function() {
            generatePlayerStatView("rgb(215, 125, 90)", 55, 99, 66, 1, 24);
        };
        scope.clickGrassCourtsButton = function() {
            generatePlayerStatView("rgb(135, 165, 95)", 14, 79, 100, 9, 77);
        };

        $timeout(function () {
            generatePlayerStatView("rgb(75, 165, 240)", 25, 28, 23, 12, 33);
        }, 0);
    },
    templateUrl: 'views/directives/playerStatDirective.html'
  };
}]);
