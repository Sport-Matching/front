/**
 * Created by ZHAJOR on 4/12/16.
 */

(function () {
    'use strict';

    angular.module('appServices')
        .factory('matches', [ '$http', '$q', 'luticateRequest', function($http, $q, luticateRequest) {

            var matches = {};

            matches.search = function (player1, player2, page, perPage) {
                return luticateRequest.get('/api/matches/'+player1+'/vs/'+player2, {page: page, perPage: perPage});
            };

            matches.searchWithName = function (player1, player2, page, perPage) {
                var deferred = $q.defer();

                $http({
                    url: '/api/matches/vs',
                    method: 'GET',
                    params: {page: page, perPage: perPage, player1: player1, player2 : player2}
                }).
                success(function (result) {
                    deferred.resolve(result);
                }).
                error(function (result, status) {
                    deferred.reject(result);
                });
                return deferred.promise;
            };

            return matches;
        }]);
})();