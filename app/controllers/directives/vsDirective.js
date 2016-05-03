angular.module('app')
.directive('vsDirective', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs) {
            scope.stats = {
                name: {
                    player1: "Rafaël NADAL",
                    player2: "Roger FEDERER"    
                },
                hardcourt: {
                    player1: {
                        valueMatchWin: 25,
                        valueQuartWin: 28,
                        valueDemiWin: 23,
                        valueFinalWin: 12,
                        valueFirstSetWin: 33
                    },
                    player2: {
                        valueMatchWin: 88,
                        valueQuartWin: 77,
                        valueDemiWin: 52,
                        valueFinalWin: 22,
                        valueFirstSetWin: 77
                    }
                },
                claycourt: {
                    player1: {
                        valueMatchWin: 44,
                        valueQuartWin: 87,
                        valueDemiWin: 65,
                        valueFinalWin: 30,
                        valueFirstSetWin: 42
                    },
                    player2: {
                        valueMatchWin: 63,
                        valueQuartWin: 99,
                        valueDemiWin: 88,
                        valueFinalWin: 77,
                        valueFirstSetWin: 66
                    }
                },
                grasscourt: {
                    player1: {
                        valueMatchWin: 41,
                        valueQuartWin: 22,
                        valueDemiWin: 12,
                        valueFinalWin: 1,
                        valueFirstSetWin: 88
                    },
                    player2: {
                        valueMatchWin: 55,
                        valueQuartWin: 77,
                        valueDemiWin: 45,
                        valueFinalWin: 32,
                        valueFirstSetWin: 71
                    }
                }
            };

            scope.players = {
                player1: {
                    img: "./img/nadal.jpg",
                    name: "Rafael NADAL",
                    nation: "ES",
                    age: 29,
                    birthday: "3 June 1986",
                    weight: "1.85m",
                    favorySurface: "Clay"
                },
                player2: {
                    img: "./img/federer.jpg",
                    name: "Roger FEDERER",
                    nation: "SUI",
                    age: 34,
                    birthday: "8 August 1981",
                    weight: "1.85m",
                    favorySurface: "Hard court"
                }
            };

            scope.predicts = [
                {
                    date: "22/05/2017 in Roland Garros",
                    predictions: [
                        {
                            id: 5,
                            player1: "Rafael NADAL",
                            player2: "Novak DJOKOVIC",
                            azurePlayer1: 45,
                            twitterPlayer1: 65,
                            firstSetPlayer1: 22
                        }
                    ]
                },
                {
                    date: "23/05/2017 in Roland Garros",
                    predictions: [
                        {
                            id: 7,
                            player1: "Rafael NADAL",
                            player2: "Novak DJOKOVIC",
                            azurePlayer1: 12,
                            twitterPlayer1: 99,
                            firstSetPlayer1: 27
                        }
                    ]
                }
            ];

            scope.hists = [
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
                        }
                    ]
                }
            ];
        },
        templateUrl: 'views/directives/vsDirective.html'
    };
});
