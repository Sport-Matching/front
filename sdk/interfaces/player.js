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

            return playerInterface;
        }]);
})();