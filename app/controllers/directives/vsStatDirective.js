angular.module('app')
    .directive('vsStatDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.stat = {};
        if (attrs.stats !== undefined) {
            var stat = JSON.parse(attrs.stats);
            scope.stats = stat;

            function generatePlayerStatView(color, id, value) {
                $timeout(function() {
                    radialProgress(document.getElementById(id + '-vs-win'), color)
                        .diameter(120)
                        .value(value.valueMatchWin)
                        .render();

                    radialProgress(document.getElementById(id + '-vs-quart'), color)
                        .diameter(120)
                        .value(value.valueQuartWin)
                        .render();

                    radialProgress(document.getElementById(id + '-vs-demi'), color)
                        .diameter(120)
                        .value(value.valueDemiWin)
                        .render();

                    radialProgress(document.getElementById(id + '-vs-final'), color)
                        .diameter(120)
                        .value(value.valueFinalWin)
                        .render();

                    /*progressLine(document.getElementById(id + 'player-stat-content-body-linear-cnt'), color, false, "rgb(215, 215, 215)")
                        .valueLeft(valueFirstSetWin);*/
                }, 0);
            }

            scope.clickHardCourtsButton = function() {
                generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hardcourt.player1);
                generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hardcourt.player2);
            };
            scope.clickClayCourtsButton = function() {
                generatePlayerStatView("rgb(215, 125, 90)", "player1", stat.claycourt.player1);
                generatePlayerStatView("rgb(215, 125, 90)", "player2", stat.claycourt.player2);
            };
            scope.clickGrassCourtsButton = function() {
                generatePlayerStatView("rgb(135, 165, 95)", "player1", stat.grasscourt.player1);
                generatePlayerStatView("rgb(135, 165, 95)", "player2", stat.grasscourt.player2);
            };

            $timeout(function () {
                generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hardcourt.player1);
                generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hardcourt.player2);
            }, 0);
        }
    },
    templateUrl: 'views/directives/vsStatDirective.html'
  };
}]);
