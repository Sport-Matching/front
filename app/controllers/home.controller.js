angular.module('app')
    .controller('HomeController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog',
        function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
            function generatePlayerView(color) {
                $scope.showPlayerPart = true;
                $scope.showPlayerStatPart = true;

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

                progressLine(document.getElementById('player-stat-content-body-linear-cnt'), color)
                    .valueLeft(33);
            }

            $scope.clickHardCourtsButton = function() {
                console.log("clickHardCourtsButton()");
                generatePlayerView("rgb(75, 165, 240)");
            };
            $scope.clickClayCourtsButton = function() {
                console.log("clickClayCourtsButton()");
                generatePlayerView("rgb(215, 125, 90)");
            };
            $scope.clickGrassCourtsButton = function() {
                console.log("clickGrassCourtsButton()");
                generatePlayerView("rgb(135, 165, 95)");
            };

            generatePlayerView("rgb(75, 165, 240)");
    }]);
