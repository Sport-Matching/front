//playerPredictionDirective
angular.module('app')
    .directive('playerPredictionDirective', ['$timeout', 'searchInterface', function ($timeout, searchInterface) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return element.attr('predicts');
                }, function (newValue) {
                    if (attrs.predicts !== undefined && attrs.predicts != "") {
                        var p = JSON.parse(attrs.predicts);
                        function generatePrediction(color, id, value) {
                            $timeout(function () {
                                radialProgress(document.getElementById(id + '-vs-pred'), color)
                                    .diameter(120)
                                    .value(value)
                                    .render();
                            });
                        };

                        scope.haveTwoPlayer = p.player2Name !== undefined;
                        scope.player1Name = p.player1Name;
                        scope.player2Name = p.player2Name;
                        scope.contentOnPredictionPart = true;
                        scope.showContentPart = scope.haveTwoPlayer;

                        var viewHard = function () {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(75, 165, 240)", "player1", 0.1565 * 100);
                                generatePrediction("rgb(75, 165, 240)", "player2", 0.76996 * 100);
                            }
                        };
                        var viewClay = function () {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(215, 125, 90)", "player1", 0.1565 * 100);
                                generatePrediction("rgb(215, 125, 90)", "player2", 0.76996 * 100);
                            }
                        };
                        var viewGrass = function () {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(135, 165, 95)", "player1", 0.1565 * 100);
                                generatePrediction("rgb(135, 165, 95)", "player2", 0.76996 * 100);
                            }
                        };

                        scope.querySearch = function (search) {
                            return searchInterface.searchPlayer(search).then(function (result) {
                                return result.Data;
                            }).catch(function (error) {
                                console.error(error);
                                return [];
                            });
                        };

                        scope.goTo = function (item) {
                            if (item !== undefined && item.Name !== undefined) {
                                scope.contentOnPredictionPart = true;
                                scope.showContentPart = true;
                                scope.player2Name = item.Name;
                                viewHard();
                            } else {
                                scope.showContentPart = false;
                                scope.player2Name = undefined;
                            }
                        };

                        scope.clickHardCourtsButton = function () {
                            viewHard();
                        };
                        scope.clickClayCourtsButton = function () {
                            viewClay();
                        };
                        scope.clickGrassCourtsButton = function () {
                            viewGrass();
                        };

                        if (scope.haveTwoPlayer) {
                            $timeout(function () {
                                viewHard();
                            }, 0);
                        }
                    }
                });
            },
            templateUrl: 'views/directives/playerPredictionDirective.html'
        };
    }]);
