angular.module('app')
    .directive('vsStatDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.stat = {};
        scope.$watch(function() {
            return element.attr('stats');
        }, function(newValue) {
            if (newValue !== undefined && newValue != "") {
                var stat = JSON.parse(newValue);
                scope.stats = stat;

                scope.linearStatAvg = [
                    {
                        id: "player1-vs-linear-cnt-avg",
                        showSubTitle: true,
                        subTitle: stat.name.player1
                    },
                    {
                        id: "player2-vs-linear-cnt-avg",
                        showSubTitle: true,
                        subTitle: stat.name.player2
                    }
                ];

                scope.linearStatWin = [
                    {
                        id: "player1-vs-linear-cnt-win",
                        showSubTitle: true,
                        subTitle: stat.name.player1
                    },
                    {
                        id: "player2-vs-linear-cnt-win",
                        showSubTitle: true,
                        subTitle: stat.name.player2
                    }
                ];

                function generatePlayerStatView(color, id, value) {
                    $timeout(function() {
                        radialProgress(document.getElementById(id + '-vs-win'), color)
                            .diameter(120)
                            .value(value.matchWin)
                            .render();

                        progressLine(document.getElementById(id + '-vs-linear-cnt-avg'), color, false, "rgb(215, 215, 215)")
                            .leftText(value.avgFirstSet)
                            .valueLeft(value.avgFirstSet * 100 / 13);
                        progressLine(document.getElementById(id + '-vs-linear-cnt-win'), color, false, "rgb(215, 215, 215)")
                            .leftText(value.firstSetWin + "%")
                            .valueLeft(value.firstSetWin);
                    }, 0);
                }

                function generateVSStat(color, value) {
                    $timeout(function() {
                        if (value >= 0) {
                            scope.contentOnWinVSStat = true;
                            radialProgress(document.getElementById('vs-win'), color)
                                .diameter(180)
                                .label(vsLabel)
                                .value(value)
                                .render();
                        } else {
                            scope.contentOnWinVSStat = false;
                        }
                    }, 0);
                }

                var vsLabel = stat.name.player1 + " win VS";
                scope.clickHardCourtsButton = function() {
                    generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hard.player1);
                    generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hard.player2);
                    generateVSStat("rgb(75, 165, 240)", stat.hard.winVS);
                };
                scope.clickClayCourtsButton = function() {
                    generatePlayerStatView("rgb(215, 125, 90)", "player1", stat.clay.player1);
                    generatePlayerStatView("rgb(215, 125, 90)", "player2", stat.clay.player2);
                    generateVSStat("rgb(215, 125, 90)", stat.clay.winVS);
                };
                scope.clickGrassCourtsButton = function() {
                    generatePlayerStatView("rgb(135, 165, 95)", "player1", stat.grass.player1);
                    generatePlayerStatView("rgb(135, 165, 95)", "player2", stat.grass.player2);
                    generateVSStat("rgb(135, 165, 95)", stat.grass.winVS);
                };

                $timeout(function () {
                    generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hard.player1);
                    generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hard.player2);
                    generateVSStat("rgb(75, 165, 240)", stat.hard.winVS);
                }, 0);
            } else {
                scope.stat = {};
            }
        });
    },
    templateUrl: 'views/directives/vsStatDirective.html'
  };
}]);
