angular.module('app')
    .controller('HomeController', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog',
        function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
            function generatePlayerView() {
                $scope.showPlayerPart = true;
                $scope.showPlayerStatPart = true;

                radialProgress(document.getElementById('player-stat-content-body-radial-main'))
                        .label("MATCH WIN")
                        .diameter(180)
                        .value(25)
                        .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-quart'))
                    .label("QUART WIN")
                    .diameter(120)
                    .value(28)
                    .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-demi'))
                    .label("DEMI WIN")
                    .diameter(120)
                    .value(23)
                    .render();

                radialProgress(document.getElementById('player-stat-content-body-radial-little-final'))
                    .label("FINAL WIN")
                    .diameter(120)
                    .value(12)
                    .render();

                progressLine(document.getElementById('player-stat-content-body-linear-cnt'))
                    .valueLeft(33);
            }

            $scope.clickHardCourtsButton = function() {
                console.log("clickHardCourtsButton()");
                generatePlayerView();
            };
            $scope.clickClayCourtsButton = function() {
                console.log("clickClayCourtsButton()");
                generatePlayerView();
            };
            $scope.clickGrassCourtsButton = function() {
                console.log("clickGrassCourtsButton()");
                generatePlayerView();
            };

            generatePlayerView();
    }]);
