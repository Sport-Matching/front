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
