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
                                                name: {
                                                    player1: descriptionPlayer1.name,
                                                    player2: descriptionPlayer2.name
                                                },
                                                hard: {
                                                    player1: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    player2: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    vsWin: 33
                                                },
                                                clay: {
                                                    player1: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    player2: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    vsWin: 33
                                                },
                                                grass: {
                                                    player1: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    player2: {
                                                        matchWin: 33,
                                                        avgFirstSet: 9.12,
                                                        firstSetWin: 60
                                                    },
                                                    vsWin: 33
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
