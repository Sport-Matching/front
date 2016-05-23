/**
 * Created by ZHAJOR on 4/12/16.
 */

(function () {
    'use strict';

    angular.module('appInterfaces')
        .factory('playerInterface', [ '$http', '$q', 'player', '$filter', function($http, $q, player, $filter) {

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
                                var playerBirthDate = new Date(descriptionResponse.Data.Player.Birthdate);
                                var playerAge = Math.floor((Date.now() - playerBirthDate.getTime()) / (31536000 * 1000));

                                var response = {
                                    description: {
                                        img: descriptionResponse.Data.Player.PictureUrl,
                                        name: descriptionResponse.Data.Player.Name,
                                        nation: descriptionResponse.Data.Player.Country,
                                        age: playerAge,
                                        birthday: $filter('date')(playerBirthDate,'d MMMM yyyy'),
                                        weight: (descriptionResponse.Data.Player.Weight - 1000) + "kg",
                                        favorySurface: "?"
                                    },
                                    predicts: [
                                    ],
                                    stats: {
                                        "hardcourt": {
                                            "valueMatchWin": 25,
                                            "valueQuartWin": 28,
                                            "valueDemiWin": 23,
                                            "valueFinalWin": 12,
                                            "valueFirstSetWin": 33
                                        },
                                        "claycourt": {
                                            "valueMatchWin": 55,
                                            "valueQuartWin": 99,
                                            "valueDemiWin": 66,
                                            "valueFinalWin": 1,
                                            "valueFirstSetWin": 24
                                        },
                                        "grasscourt": {
                                            "valueMatchWin": 14,
                                            "valueQuartWin": 79,
                                            "valueDemiWin": 100,
                                            "valueFinalWin": 9,
                                            "valueFirstSetWin": 77
                                        }
                                    },
                                    histo: [
                                    ]
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
