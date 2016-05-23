//playerPredictionDirective
angular.module('app')
.directive('playerPredictionDirective', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return element.attr('predicts');
            }, function(newValue) {
                var tabPrediction = JSON.parse(attrs.predicts);
                scope.predictions = tabPrediction;
                if (tabPrediction !== undefined) {
                    function generateAPlayerPredictionView(predict) {
                        var player1color = "rgb(75, 166, 238)";
                        var player2color = "rgb(66, 80, 175)";

                        var colorAzure = (predict.azurePlayer1 >= 50) ? player2color : player1color;
                        var bagroundAzureColor = (predict.azurePlayer1 < 50) ? player2color : player1color;
                        radialProgress(document.getElementById('player-predict-radial-azure-' + predict.id), colorAzure, bagroundAzureColor)
                        .label("Azure")
                        .diameter(120)
                        .value((predict.azurePlayer1 >= 50) ? predict.azurePlayer1 : (100 - predict.azurePlayer1))
                        .render();

                        var colorTwitter = (predict.twitterPlayer1 >= 50) ? player2color : player1color;
                        var bagroundTwitterColor = (predict.twitterPlayer1 < 50) ? player2color : player1color;
                        radialProgress(document.getElementById('player-predict-radial-twitter-' + predict.id), colorTwitter, bagroundTwitterColor)
                        .label("Twitter")
                        .diameter(120)
                        .value((predict.twitterPlayer1 >= 50) ? predict.twitterPlayer1 : (100 - predict.twitterPlayer1))
                        .render();

                        $timeout(function() {
                            progressLine(document.getElementById('player-predict-cnt-linear-' + predict.id), player1color, true, player2color)
                            .valueLeft(predict.firstSetPlayer1);
                        }, 0);
                    }

                    scope.contentOnPredictionPart = tabPrediction.length !== 0;
                    $timeout(function () {
                        for (u in tabPrediction) {
                            for (i in tabPrediction[u].predictions) {
                                generateAPlayerPredictionView(tabPrediction[u].predictions[i]);
                            }
                        }
                    }, 0);
                }
            });
        },
        templateUrl: 'views/directives/playerPredictionDirective.html'
    };
}]);
