/**
 * Created by ZHAJOR on 4/12/16.
 */


(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('searchInterface', ['$http', '$q', 'matches', 'player', function ($http, $q, matches, player) {

            var searchInterface = {};

            searchInterface.search = function (text) {

                var deferred = $q.defer();

                if (text == null) {
                    text = "";
                }
                text = angular.lowercase(text);

                var tab = text.split(" ");
                var isMatch = false;
                tab.forEach(function (e) {

                    if (e == 'vs') {
                        isMatch = true;
                    }
                });

                if (isMatch) {
                    var sp = text.split(/ vs ?/);
                    if (sp.length == 1) {
                        sp.push("");
                    }
                    else if (sp.length > 2) {
                        sp = [text];
                    }

                    player.search(0, 1, sp[0].trim()).then(function (player1) {
                        if (player1.Data.length > 0) {
                            player1 = player1.Data[0];
                            player.search(0, 10, sp[1].trim()).then(function (player2) {
                                var data = {
                                    Count: player2.Count,
                                    Data: []
                                };

                                player2.Data.forEach(function (item) {
                                    data.Data.push({
                                        Player1: player1,
                                        Player2: item,
                                        Text: player1.Name + " VS " + item.Name
                                    });
                                });

                                deferred.resolve(data);
                            }, deferred.reject);
                        }
                        else {
                            deferred.resolve({
                                Count: 0,
                                Data: []
                            });
                        }
                    }, deferred.reject);
                }
                else {
                    player.search(0, 10, text).then(function (data) {
                        data.Data.forEach(function (item) {
                            item.Text = item.Name;
                        });
                        deferred.resolve(data);
                    }, deferred.reject);
                }
                return deferred.promise;
            };

            searchInterface.searchPlayer = function (text) {
                var deferred = $q.defer();

                if (text == null) {
                    text = "";
                }
                text = angular.lowercase(text);
                player.search(0, 10, text).then(function (data) {
                    data.Data.forEach(function (item) {
                        item.Text = item.Name;
                    });
                    deferred.resolve(data);
                }, deferred.reject);
                return deferred.promise;
            };

            return searchInterface;
        }]);
})();