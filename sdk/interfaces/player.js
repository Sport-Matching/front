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
                            var stat = helper.generateStat(desc.name, data.Data.Data);

                            var response = {
                                description: desc,
                                predicts: [
                                ],
                                stats: stat,
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
