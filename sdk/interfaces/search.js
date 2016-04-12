/**
 * Created by ZHAJOR on 4/12/16.
 */


(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('searchInterface', [ '$http', '$q', 'matches', 'player', function($http, $q, matches, player) {

            var searchInterface = {};

            searchInterface.search = function(text){
                var deferred = $q.defer();
                deferred.reject("bad");
                if (text === null) return deferred.promise;
                var tab = text.split(" ");
                var isMatch = false;
                tab.forEach(function(e){

                    if (angular.lowercase(e) == 'vs') {
                        isMatch = true;
                    }
                });
                if (isMatch){
                    var sp = text.split("vs");
                    if (sp.length < 2 || sp.length > 2) return deferred.promise;
                    var player1 = -1;
                    var player2 = -1;
                    player.search(0,1, sp[0].trim()).then(function(result){
                        player1 = result.Data[0].Id;
                        player.search(0,1, sp[1].trim()).then(function(result){
                            player2 = result.Data[0].Id;
                            matches.search(player1,player2, 0,10).then(function(result){
                                deferred.resolve(result);
                            });
                        });
                    });

                    return deferred.promise;
                }
                else
                    return player.search(0, 10, text);
            };

            return searchInterface;
        }]);
})();