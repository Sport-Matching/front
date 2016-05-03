angular.module('app')
    .directive('playerDirective', [function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.contentOnHistoryTournamentPart = false;

        scope.player = {
            img: "./img/nadal.jpg",
            name: "Rafael NADAL",
            nation: "ES",
            age: 29,
            birthday: "3 June 1986",
            weight: "1.85m",
            favorySurface: "Clay"
        };

        scope.predicts = [
            {
                date: "22/05/2017 in Roland Garros",
                predictions: [
                    {
                        id: 1,
                        player1: "Rafael NADAL",
                        player2: "Novak DJOKOVIC",
                        azurePlayer1: 45,
                        twitterPlayer1: 65,
                        firstSetPlayer1: 22
                    },
                    {
                        id: 2,
                        player1: "Rafael NADAL",
                        player2: "Roger FEDERER",
                        azurePlayer1: 44,
                        twitterPlayer1: 32,
                        firstSetPlayer1: 12
                    }
                ]
            },
            {
                date: "23/05/2017 in Roland Garros",
                predictions: [
                    {
                        id: 3,
                        player1: "Rafael NADAL",
                        player2: "Novak DJOKOVIC",
                        azurePlayer1: 12,
                        twitterPlayer1: 99,
                        firstSetPlayer1: 27
                    },
                    {
                        id: 4,
                        player1: "Rafael NADAL",
                        player2: "Roger FEDERER",
                        azurePlayer1: 55,
                        twitterPlayer1: 33,
                        firstSetPlayer1: 88
                    }
                ]
            }
        ];

        scope.stats = {
                    "hardcourt": {
                        "valueMatchWin": 25,
                        "valueQuartWin": 28,
                        "valueDemiWin": 23,
                        "valueFinalWin": 12,
                        "valueFirstSetWin": 33
                    },
                    "claycourt": {
                        "valueMatchWin": 55,
                        "valueQuartWin": 99,
                        "valueDemiWin": 66,
                        "valueFinalWin": 1,
                        "valueFirstSetWin": 24
                    },
                    "grasscourt": {
                        "valueMatchWin": 14,
                        "valueQuartWin": 79,
                        "valueDemiWin": 100,
                        "valueFinalWin": 9,
                        "valueFirstSetWin": 77
                    }
                };

        scope.historics = [
            {
                tournament: "Winbledon",
                matchs: [
                    {
                        date: "03/07/2016",
                        player1: "Rafael NADAL",
                        player2: "Roger FEDERER",
                        player1Set1: 6,
                        player2Set1: 4,
                        player1Set2: 4,
                        player2Set2: 6,
                        player1Set3: 3,
                        player2Set3: 6,
                        player1Set4: 3,
                        player2Set4: 6
                    },
                    {
                        date: "02/07/2016",
                        player1: "Gaël MONFILS",
                        player2: "Rafael NADAL",
                        player1Set1: 1,
                        player2Set1: 6,
                        player1Set2: 4,
                        player2Set2: 6,
                        player1Set3: 3,
                        player2Set3: 6
                    }
                ]
            },
            {
                tournament: "Roland Garros",
                matchs: [
                    {
                        date: "28/05/2016",
                        player1: "Rafael NADAL",
                        player2: "Roger FEDERER",
                        player1Set1: 6,
                        player2Set1: 4,
                        player1Set2: 4,
                        player2Set2: 6,
                        player1Set3: 3,
                        player2Set3: 6,
                        player1Set4: 3,
                        player2Set4: 6
                    },
                    {
                        date: "27/05/2016",
                        player1: "Gaël MONFILS",
                        player2: "Rafael NADAL",
                        player1Set1: 1,
                        player2Set1: 6,
                        player1Set2: 4,
                        player2Set2: 6,
                        player1Set3: 3,
                        player2Set3: 6
                    }
                ]
            }
        ];
    },
    templateUrl: 'views/directives/playerDirective.html'
  };
}]);
