/**
 * Created by ZHAJOR on 4/12/16.
 */


(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('matchesInterface', [ '$http', '$q', 'matches', function($http, $q, matches) {

            var matchesInterface = {};

            matchesInterface.search = matches.search;
            
            matchesInterface.searchWithName = matches.searchWithName;
            
            return matchesInterface;
        }]);
})();