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
            if (attrs.stats !== undefined && attrs.stats != "") {
                var stat = JSON.parse(attrs.stats);
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

                var vsLabel = stat.name.player1 + " win VS";
                scope.clickHardCourtsButton = function() {
                    generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hard.player1);
                    generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hard.player2);

                    radialProgress(document.getElementById('vs-win'), "rgb(75, 165, 240)")
                        .diameter(180)
                        .label(vsLabel)
                        .value(stat.hard.vsWin)
                        .render();
                };
                scope.clickClayCourtsButton = function() {
                    generatePlayerStatView("rgb(215, 125, 90)", "player1", stat.clay.player1);
                    generatePlayerStatView("rgb(215, 125, 90)", "player2", stat.clay.player2);

                    radialProgress(document.getElementById('vs-win'), "rgb(215, 125, 90)")
                        .diameter(180)
                        .label(vsLabel)
                        .value(stat.clay.vsWin)
                        .render();
                };
                scope.clickGrassCourtsButton = function() {
                    generatePlayerStatView("rgb(135, 165, 95)", "player1", stat.grass.player1);
                    generatePlayerStatView("rgb(135, 165, 95)", "player2", stat.grass.player2);

                    radialProgress(document.getElementById('vs-win'), "rgb(135, 165, 95)")
                        .diameter(180)
                        .label(vsLabel)
                        .value(stat.grass.vsWin)
                        .render();
                };

                $timeout(function () {
                    generatePlayerStatView("rgb(75, 165, 240)", "player1", stat.hard.player1);
                    generatePlayerStatView("rgb(75, 165, 240)", "player2", stat.hard.player2);

                    radialProgress(document.getElementById('vs-win'), "rgb(75, 165, 240)")
                        .diameter(180)
                        .label(vsLabel)
                        .value(stat.hard.vsWin)
                        .render();
                }, 0);
            } else {
                scope.stat = {};
            }
        });
    },
    templateUrl: 'views/directives/vsStatDirective.html'
  };
}]);
