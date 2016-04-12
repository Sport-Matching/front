/**
 * Created by ZHAJOR on 4/12/16.
 */


(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('searchInterface', [ '$http', '$q', 'matches', 'player', function($http, $q, matches, player) {

            var searchInterface = {};

            searchInterface.search = function(text){

                if (text === null){
                    var deferred = $q.defer();
                    deferred.reject("bad null value");
                    return deferred.promise};
                var tab = text.split(" ");
                var isMatch = false;
                tab.forEach(function(e){

                    if (angular.lowercase(e) == 'vs') {
                        isMatch = true;
                    }
                });
                if (isMatch){
                    var sp = text.split(" vs ");
                    if (sp.length < 2 || sp.length > 2) {
                        var deferred2 = $q.defer();
                        deferred2.reject("bad null split");
                        return deferred2.promise};
                    var player1 = -1;
                    var player2 = -1;
                    var resultation = $q.defer();
                   player.search(0,10, sp[1].trim()).then(function(result){
                       var provi = result.Data.map(function(e){return {'Name':sp[0].trim()+" vs "+e.Name}});
                       provi = {Data: provi};
                       resultation.resolve(provi);

                            //matches.search(player1,player2, 0,10).then(function(result){
                            //    deferred.resolve(result);
                            //});
                   });
                    return resultation.promise;
                }
                else
                    return player.search(0, 10, text);
            };

            return searchInterface;
        }]);
})();