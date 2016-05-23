/**
* Created by ZHAJOR on 4/12/16.
*/

(function () {
    'use strict';

    angular.module('appInterfaces')
    .factory('playerInterface', [ '$http', '$q', 'player', '$filter', function($http, $q, player, $filter) {

        var playerInterface = {};

        playerInterface.search = player.search;

        playerInterface.getMatches =player.getMatches;

        playerInterface.getAll = player.getAll;

        playerInterface.get = function(id, completion) {
            player.getPlayerDescription(id, function(success, error, data) {
                if (success) {
                    var descriptionResponse = data;
                    player.getPlayerHistory(id, function(success, error, data) {
                        if (success) {
                            var playerBirthDate = new Date(descriptionResponse.Data.Player.Birthdate);
                            var playerAge = Math.floor((Date.now() - playerBirthDate.getTime()) / (31536000 * 1000));

                            var tabHisto = [];
                            var i = 0;
                            for (i = 0; i < data.Data.Data.length; i += 1) {
                                var t = data.Data.Data[i];
                                var tournamentDate = new Date(t.Date);
                                var tournamentName = t.Tournament.Name;

                                var s = {};
                                var u = 0;
                                for(u = 0; u < t.Sets.length; u += 1) {
                                    if (t.Sets[u] !== null && t.Sets[u].Player1Score >= 0 && t.Sets[u].Player2Score >= 0) {
                                        switch (u) {
                                            case 0:
                                                s.player1Set1 = t.Sets[u].Player1Score;
                                                s.player2Set1 = t.Sets[u].Player2Score;
                                                break;
                                            case 1:
                                                s.player1Set2 = t.Sets[u].Player1Score;
                                                s.player2Set2 = t.Sets[u].Player2Score;
                                                break;
                                            case 2:
                                                s.player1Set3 = t.Sets[u].Player1Score;
                                                s.player2Set3 = t.Sets[u].Player2Score;
                                                break;
                                            case 3:
                                                s.player1Set4 = t.Sets[u].Player1Score;
                                                s.player2Set4 = t.Sets[u].Player2Score;
                                                break;
                                            case 4:
                                                s.player1Set5 = t.Sets[u].Player1Score;
                                                s.player2Set5 = t.Sets[u].Player2Score;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                                var m = {
                                    date: $filter('date')(tournamentDate,'d MMMM yyyy'),
                                    player1: t.Player1.Name,
                                    player2: t.Player2.Name,
                                    player1Set1: s.player1Set1,
                                    player2Set1: s.player2Set1,
                                    player1Set2: s.player1Set2,
                                    player2Set2: s.player2Set2,
                                    player1Set3: s.player1Set3,
                                    player2Set3: s.player2Set3,
                                    player1Set4: s.player1Set4,
                                    player2Set4: s.player2Set4,
                                    player1Set5: s.player1Set5,
                                    player2Set5: s.player2Set5
                                };

                                var f = function(tInstance) {
                                    return tInstance.tournament == tournamentName;
                                };
                                var
                                p = tabHisto.find(f);
                                console.log("##############");
                                console.log(p);
                                console.log(tabHisto);
                                console.log(tournamentName);
                                if (p !== undefined) {
                                    p.matchs.push(m);
                                } else {
                                    tabHisto.push({
                                        tournament: tournamentName,
                                        matchs: [m]
                                    });
                                }
                            }
                            console.log(data.Data);
                            console.log(tabHisto);

                            var response = {
                                description: {
                                    img: descriptionResponse.Data.Player.PictureUrl,
                                    name: descriptionResponse.Data.Player.Name,
                                    nation: descriptionResponse.Data.Player.Country,
                                    age: playerAge,
                                    birthday: $filter('date')(playerBirthDate,'d MMMM yyyy'),
                                    weight: (descriptionResponse.Data.Player.Weight / 1000) + "kg",
                                    favorySurface: "?"
                                },
                                predicts: [
                                ],
                                stats: {
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
                                },
                                histo: tabHisto
                            };
                            completion(success, error, response);
                        } else {
                            completion(success, error, undefined);
                        }
                    });
                } else {
                    completion(success, error, undefined);
                }
            })
        };

        return playerInterface;
    }]);
})();
