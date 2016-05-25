//playerStatDirective
angular.module('app')
    .directive('playerStatDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.$watch(function() {
            return element.attr('stats');
        }, function(newValue) {
            var stat = JSON.parse(newValue);
            if (stat.hard !== undefined) {
                function generatePlayerStatView(color, courtStats) {
                    $timeout(function() {
                        radialProgress(document.getElementById('player-stat-content-body-radial-main'), color)
                            .label("MATCH WIN")
                            .diameter(180)
                            .value(courtStats.matchWin)
                            .render();

                        progressLine(document.getElementById('player-stat-content-body-linear-cnt-avg'), color, false, "rgb(215, 215, 215)")
                            .leftText(courtStats.avgFirstSet)
                            .valueLeft(courtStats.avgFirstSet * 100 / 13);
                        progressLine(document.getElementById('player-stat-content-body-linear-cnt-win'), color, false, "rgb(215, 215, 215)")
                            .leftText(courtStats.firstSetWin + "%")
                            .valueLeft(courtStats.firstSetWin);
                    }, 0);
                }

                scope.clickHardCourtsButton = function() {
                    generatePlayerStatView("rgb(75, 165, 240)", stat.hard);
                };
                scope.clickClayCourtsButton = function() {
                    generatePlayerStatView("rgb(215, 125, 90)", stat.clay);
                };
                scope.clickGrassCourtsButton = function() {
                    generatePlayerStatView("rgb(135, 165, 95)", stat.grass);
                };

                $timeout(function () {
                    generatePlayerStatView("rgb(75, 165, 240)", stat.hard);
                }, 0);
            }
        });
    },
    templateUrl: 'views/directives/playerStatDirective.html'
  };
}]);
