/**
 * Created by ZHAJOR on 4/12/16.
 */

(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('playerInterface', [ '$http', '$q', 'player', function($http, $q, player) {

            var playerInterface = {};

            playerInterface.search = player.search;

            playerInterface.getMatches =player.getMatches;

            playerInterface.getAll = player.getAll;

            playerInterface.get = function(id, completion) {
                player.getPlayerDescription(id, function(success, error, data) {
                    if (success) {
                        var descriptionResponse = data;
                        player.getPlayerHistory(id, function(success, error, data) {
                            completion(success, error, descriptionResponse, data);
                        });
                    } else {
                        completion(success, error, undefined, undefined);
                    }
                })
            };

            return playerInterface;
        }]);
})();
