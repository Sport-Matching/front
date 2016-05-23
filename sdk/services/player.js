/**
 * Created by ZHAJOR on 4/12/16.
 */

(function () {
    'use strict';

    angular.module('appServices')
        .factory('player', [ '$http', '$q', 'luticateRequest', function($http, $q, luticateRequest) {

            var player = {};

            player.search = function (page, perPage, query) {
                return luticateRequest.get('/api/players', {page: page, perPage: perPage, query: query});
            };

            player.getMatches = function (id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/players/'+id+'/matches',
                    method: 'GET'
                }).
                success(function (result) {
                    deferred.resolve(result);
                }).
                error(function (result, status) {
                    deferred.reject(result);
                });
                return deferred.promise;
            };

            player.getAll = function (id) {
                var deferred = $q.defer();

                $http({
                    url: '/api/players/'+id,
                    method: 'GET'
                }).
                success(function (result) {
                    deferred.resolve(result);
                }).
                error(function (result, status) {
                    deferred.reject(result);
                });
                return deferred.promise;
            };

            player.getPlayerDescription = function(id, completion) {
                $http({
                    method: 'GET',
                    url: '/api/players/' + id
                }).then(function successCallback(response) {
                    completion(true, undefined, response.data);
                }, function errorCallback(response) {
                    completion(false, response, undefined);
                });
            };

            player.getPlayerHistory = function(id, completion) {
                $http({
                    method: 'GET',
                    url: '/api/players/' + id + '/matches'
                }).then(function successCallback(response) {
                    completion(true, undefined, response.data);
                }, function errorCallback(response) {
                    completion(false, response, undefined);
                });
            };

            return player;
        }]);
})();
