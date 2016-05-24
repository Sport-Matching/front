/**
 * Created by ZHAJOR on 4/12/16.
 */


(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('matchesInterface', [ '$http', '$q', 'matches', 'helper', function($http, $q, matches, helper) {

            var matchesInterface = {};

            matchesInterface.search = matches.search;

            matchesInterface.searchWithName = matches.searchWithName;

            matchesInterface.get = function(player1_id, player2_id, completion) {
                matches.get(player1_id, player2_id, function(success, error, data) {
                    if (success) {
                        var tabHisto = helper.parseHistoryList(data);
                        completion(success, undefined, tabHisto);
                    } else {
                        completion(false, error, undefined);
                    }
                });
            };

            return matchesInterface;
        }]);
})();
