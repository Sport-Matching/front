/**
* Created by ZHAJOR on 4/12/16.
*/

(function () {
    'use strict';

    angular.module('appInterfaces')
    .factory('playerInterface', [ '$http', '$q', 'player', '$filter', 'helper', function($http, $q, player, $filter, helper) {

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
                            var desc = helper.parsePlayerDescriptionResponse(descriptionResponse);
                            var tabHisto = helper.parseHistoryList(data.Data);

                            var response = {
                                description: desc,
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
