(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('vsInterface', [ 'matches', 'player', 'helper', function(matches, player, helper) {

            var vs = {};

            vs.get = function(player1_id, player2_id, completion) {
                player.getPlayerDescription(player1_id, function(success, error, data) {
                    if (success) {
                        var descriptionPlayer1 = helper.parsePlayerDescriptionResponse(data);
                        player.getPlayerDescription(player2_id, function(success, error, data) {
                            if (success) {
                                var descriptionPlayer2 = helper.parsePlayerDescriptionResponse(data);
                                matches.get(player1_id, player2_id, function(success, error, data) {
                                    if (success) {
                                        var matchList = helper.parseHistoryList(data.Data);
                                        var response = {
                                            players: {
                                                player1: descriptionPlayer1,
                                                player2: descriptionPlayer2
                                            },
                                            predicts: [],
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
                                            hists: matchList
                                        }
                                        completion(success, undefined, response);
                                    } else {
                                        completion(false, error, undefined);
                                    }
                                });
                            } else {
                                completion(false, error, undefined);
                            }
                        });
                    } else {
                        completion(false, error, undefined);
                    }
                });
            };

            return vs;
        }]);
})();
