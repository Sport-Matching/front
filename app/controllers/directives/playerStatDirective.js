//playerStatDirective
angular.module('app')
    .directive('playerStatDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        var stat = JSON.parse(attrs.stats);

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
            generatePlayerStatView("rgb(75, 165, 240)", stat.hardcourt.valueMatchWin, stat.hardcourt.valueQuartWin, stat.hardcourt.valueDemiWin, stat.hardcourt.valueFinalWin, stat.hardcourt.valueFirstSetWin);
        };
        scope.clickClayCourtsButton = function() {
            generatePlayerStatView("rgb(215, 125, 90)", stat.claycourt.valueMatchWin, stat.claycourt.valueQuartWin, stat.claycourt.valueDemiWin, stat.claycourt.valueFinalWin, stat.claycourt.valueFirstSetWin);
        };
        scope.clickGrassCourtsButton = function() {
            generatePlayerStatView("rgb(135, 165, 95)", stat.grasscourt.valueMatchWin, stat.grasscourt.valueQuartWin, stat.grasscourt.valueDemiWin, stat.grasscourt.valueFinalWin, stat.grasscourt.valueFirstSetWin);
        };

        $timeout(function () {
            generatePlayerStatView("rgb(75, 165, 240)", stat.hardcourt.valueMatchWin, stat.hardcourt.valueQuartWin, stat.hardcourt.valueDemiWin, stat.hardcourt.valueFinalWin, stat.hardcourt.valueFirstSetWin);
        }, 0);
    },
    templateUrl: 'views/directives/playerStatDirective.html'
  };
}]);
