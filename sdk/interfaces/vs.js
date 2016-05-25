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
                            player.getPlayerHistory(player1_id, function(success, error, data) {
                                if (success) {
                                    var tabHistoPlayer1 = data.Data.Data;
                                    player.getPlayerHistory(player2_id, function(success, error, data) {
                                        if (success) {
                                            var tabHistoPlayer2 = data.Data.Data;
                                            matches.get(player1_id, player2_id, function(success, error, data) {
                                                if (success) {
                                                    var matchList = helper.parseHistoryList(data.Data);
                                                    var stat = helper.generateVSStat(descriptionPlayer1.name, descriptionPlayer2.name, tabHistoPlayer1, tabHistoPlayer2, data.Data.Data);

                                                    var response = {
                                                        players: {
                                                            player1: descriptionPlayer1,
                                                            player2: descriptionPlayer2
                                                        },
                                                        predicts: [],
                                                        stats: stat,
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
