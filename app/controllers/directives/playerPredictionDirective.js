//playerPredictionDirective
angular.module('app')
    .directive('playerPredictionDirective', ['$timeout', 'searchInterface', 'playerInterface', function ($timeout, searchInterface, playerInterface) {
        var GROUND = {
            CLAY: 0,
            GRASS: 1,
            HARD: 2
        };

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
                        scope.isLoading = false;

                        var makeRequest = function (name1, name2, ground_type, completion) {
                            scope.isLoading = true;
                            scope.contentOnPredictionPart = true;
                            scope.showContentPart = false;

                            var d = new Date();
                            var strd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

                            var p = playerInterface.getPrediction(name1, name2, strd);
                            p.then(function (r) {
                                scope.isLoading = false;
                                scope.contentOnPredictionPart = true;
                                scope.showContentPart = true;
                                $timeout(function () {
                                    console.log(r);
                                    var v1 = r.Data.prediction;
                                    var v2 = r.Data.prediction2;

                                    completion(v1, v2);
                                }, 0);
                            }, function (reason) {
                                scope.isLoading = false;
                                scope.contentOnPredictionPart = false;
                                scope.showContentPart = false;
                            });
                        };

                        var viewHard = function (v1, v2) {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(75, 165, 240)", "player1", v1 * 100);
                                generatePrediction("rgb(75, 165, 240)", "player2", v2 * 100);
                            }
                        };
                        var viewClay = function (v1, v2) {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(215, 125, 90)", "player1", v1 * 100);
                                generatePrediction("rgb(215, 125, 90)", "player2", v2 * 100);
                            }
                        };
                        var viewGrass = function (v1, v2) {
                            if (scope.contentOnPredictionPart) {
                                generatePrediction("rgb(135, 165, 95)", "player1", v1 * 100);
                                generatePrediction("rgb(135, 165, 95)", "player2", v2 * 100);
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
                                scope.player2Name = item.Name;
                                makeRequest(scope.player1Name, scope.player2Name, GROUND.HARD, function (v1, v2) {
                                    viewHard(v1, v2);
                                });
                            } else {
                                scope.showContentPart = false;
                                scope.player2Name = undefined;
                            }
                        };

                        scope.clickHardCourtsButton = function () {
                            if (scope.player2Name !== undefined) {
                                makeRequest(scope.player1Name, scope.player2Name, GROUND.HARD, function (v1, v2) {
                                    viewHard(v1, v2);
                                });
                            }
                        };
                        scope.clickClayCourtsButton = function () {
                            if (scope.player2Name !== undefined) {
                                makeRequest(scope.player1Name, scope.player2Name, GROUND.CLAY, function (v1, v2) {
                                    viewClay(v1, v2);
                                });
                            }
                        };
                        scope.clickGrassCourtsButton = function () {
                            if (scope.player2Name !== undefined) {
                                makeRequest(scope.player1Name, scope.player2Name, GROUND.GRASS, function (v1, v2) {
                                    viewGrass(v1, v2);
                                });
                            }
                        };

                        if (scope.haveTwoPlayer) {
                            makeRequest(p.player1Name, p.player2Name, GROUND.HARD, function (v1, v2) {
                                viewHard(v1, v2);
                            });
                        }
                    }
                });
            },
            templateUrl: 'views/directives/playerPredictionDirective.html'
        };
    }]);
