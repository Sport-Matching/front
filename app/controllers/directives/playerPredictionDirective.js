//playerPredictionDirective
angular.module('app')
    .directive('playerPredictionDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        var tabPrediction = [{date: "22/05/2017 in Roland Garros", predictions: [{id: 1, player1: "Rafael NADAL", player2: "Novak DJOKOVIC", azurePlayer1: 45, twitterPlayer1: 65, firstSetPlayer1: 22},
                                                                                 {id: 2, player1: "Rafael NADAL", player2: "Roger FEDERER", azurePlayer1: 44, twitterPlayer1: 32, firstSetPlayer1: 12}]},
                            {date: "23/05/2017 in Roland Garros", predictions: [{id: 3, player1: "Rafael NADAL", player2: "Novak DJOKOVIC", azurePlayer1: 12, twitterPlayer1: 99, firstSetPlayer1: 27},
                                                                                {id: 4, player1: "Rafael NADAL", player2: "Roger FEDERER", azurePlayer1: 55, twitterPlayer1: 33, firstSetPlayer1: 88}]}];
        scope.predictions = tabPrediction;

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

        scope.contentOnPredictionPart = tabPrediction.lenght !== 0;
        $timeout(function () {
            for (u in tabPrediction) {
                for (i in tabPrediction[u].predictions) {
                    generateAPlayerPredictionView(tabPrediction[u].predictions[i]);
                }
            }
        }, 0);
    },
    templateUrl: 'views/directives/playerPredictionDirective.html'
  };
}]);
