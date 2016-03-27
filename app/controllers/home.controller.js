angular.module('app')
    .controller('HomeController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$timeout',
        function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $timeout){
            $scope.showPlayerPart = true;
            $scope.showPlayerStatPart = true;
            $scope.showPlayerPredictionPart = true;

            $scope.contentOnHistoryTournamentPart = false;

            function generatePlayerStatView(color) {
                $timeout(function() {
                    radialProgress(document.getElementById('player-stat-content-body-radial-main'), color)
                        .label("MATCH WIN")
                        .diameter(180)
                        .value(25)
                        .render();

                    radialProgress(document.getElementById('player-stat-content-body-radial-little-quart'), color)
                        .label("QUART WIN")
                        .diameter(120)
                        .value(28)
                        .render();

                    radialProgress(document.getElementById('player-stat-content-body-radial-little-demi'), color)
                        .label("DEMI WIN")
                        .diameter(120)
                        .value(23)
                        .render();

                    radialProgress(document.getElementById('player-stat-content-body-radial-little-final'), color)
                        .label("FINAL WIN")
                        .diameter(120)
                        .value(12)
                        .render();

                    progressLine(document.getElementById('player-stat-content-body-linear-cnt'), color, false, "rgb(215, 215, 215)")
                        .valueLeft(33);
                }, 0);
            }

            function generateAPlayerPredictionView(predict) {
                $timeout(function () {
                    var player1color = "rgb(75, 166, 238)";
                    var player2color = "rgb(66, 80, 175)";

                    var colorAzure = (predict.azureplayer1 >= 50) ? player2color : player1color;
                    var bagroundAzureColor = (predict.azureplayer1 < 50) ? player2color : player1color;
                    radialProgress(document.getElementById('player-predict-radial-azure-' + predict.id), colorAzure, bagroundAzureColor)
                        .label("Azure")
                        .diameter(120)
                        .value((predict.azureplayer1 >= 50) ? predict.azureplayer1 : (100 - predict.azureplayer1))
                        .render();

                    var colorTwitter = (predict.twitterplayer1 >= 50) ? player2color : player1color;
                    var bagroundTwitterColor = (predict.twitterplayer1 < 50) ? player2color : player1color;
                    radialProgress(document.getElementById('player-predict-radial-twitter-' + predict.id), colorTwitter, bagroundTwitterColor)
                        .label("Twitter")
                        .diameter(120)
                        .value((predict.twitterplayer1 >= 50) ? predict.twitterplayer1 : (100 - predict.twitterplayer1))
                        .render();

                    progressLine(document.getElementById('player-predict-cnt-linear-' + predict.id), player1color, true, player2color)
                        .valueLeft(33);
                }, 0);
            }

            $scope.clickHardCourtsButton = function() {
                generatePlayerStatView("rgb(75, 165, 240)");
            };
            $scope.clickClayCourtsButton = function() {
                generatePlayerStatView("rgb(215, 125, 90)");
            };
            $scope.clickGrassCourtsButton = function() {
                generatePlayerStatView("rgb(135, 165, 95)");
            };

            $timeout(function () {
                generatePlayerStatView("rgb(75, 165, 240)");
                generateAPlayerPredictionView({id: 1, azureplayer1: 45, twitterplayer1: 65});
            }, 0);
    }]);
