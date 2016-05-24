(function () {
    'use strict';

    angular.module('appServices')
        .factory('helper', ['$filter', function($filter) {
            var helper = {};

            helper.parsePlayerDescriptionResponse = function(data) {
                var playerBirthDate = new Date(data.Data.Player.Birthdate);
                var playerAge = Math.floor((Date.now() - playerBirthDate.getTime()) / (31536000 * 1000));

                return {
                        img: data.Data.Player.PictureUrl,
                        name: data.Data.Player.Name,
                        nation: data.Data.Player.Country,
                        age: playerAge,
                        birthday: $filter('date')(playerBirthDate, 'd MMM yyyy'),
                        weight: (data.Data.Player.Weight / 1000) + "kg",
                        favorySurface: "?"
                };
            };

            helper.parseHistoryList = function(data) {
                var tabHisto = [];
                var i = 0;
                for (i = 0; i < data.Data.length; i += 1) {
                    var t = data.Data[i];
                    var tournamentDate = new Date(t.Date);
                    var tournamentName = t.Tournament.Name + " " + t.Tournament.Year;

                    var s = {};
                    var u = 0;
                    for(u = 0; u < t.Sets.length; u += 1) {
                        if (t.Sets[u] !== null && t.Sets[u].Player1Score >= 0 && t.Sets[u].Player2Score >= 0) {
                            switch (u) {
                                case 0:
                                    s.player1Set1 = t.Sets[u].Player1Score;
                                    s.player2Set1 = t.Sets[u].Player2Score;
                                    break;
                                case 1:
                                    s.player1Set2 = t.Sets[u].Player1Score;
                                    s.player2Set2 = t.Sets[u].Player2Score;
                                    break;
                                case 2:
                                    s.player1Set3 = t.Sets[u].Player1Score;
                                    s.player2Set3 = t.Sets[u].Player2Score;
                                    break;
                                case 3:
                                    s.player1Set4 = t.Sets[u].Player1Score;
                                    s.player2Set4 = t.Sets[u].Player2Score;
                                    break;
                                case 4:
                                    s.player1Set5 = t.Sets[u].Player1Score;
                                    s.player2Set5 = t.Sets[u].Player2Score;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }

                    if (s.player1Set1 != undefined && s.player1Set1 != null) {
                        var m = {
                            date: $filter('date')(tournamentDate,'d MMM yyyy'),
                            player1: t.Player1.Name,
                            player2: t.Player2.Name,
                            player1Set1: s.player1Set1,
                            player2Set1: s.player2Set1,
                            player1Set2: s.player1Set2,
                            player2Set2: s.player2Set2,
                            player1Set3: s.player1Set3,
                            player2Set3: s.player2Set3,
                            player1Set4: s.player1Set4,
                            player2Set4: s.player2Set4,
                            player1Set5: s.player1Set5,
                            player2Set5: s.player2Set5
                        };

                        var f = function(tInstance) {
                            return tInstance.tournament == tournamentName && tInstance.year == t.Tournament.Year;
                        };
                        var
                        p = tabHisto.find(f);
                        if (p !== undefined) {
                            p.matchs.push(m);
                        } else {
                            tabHisto.push({
                                tournament: tournamentName,
                                year: t.Tournament.Year,
                                matchs: [m]
                            });
                        }
                    }
                }
                return tabHisto;
            };

            return helper;
        }]);
})();
