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

            helper.generateStat = function(playerName, tabHisto) {
                var r = {
                    hard: {
                        matchCount: 0,
                        matchWin: 0,
                        nbGameFirstSet: 0,
                        winFirstSet: 0
                    },
                    clay: {
                        matchCount: 0,
                        matchWin: 0,
                        nbGameFirstSet: 0,
                        winFirstSet: 0
                    },
                    grass: {
                        matchCount: 0,
                        matchWin: 0,
                        nbGameFirstSet: 0,
                        winFirstSet: 0
                    }
                };

                var i = 0;
                while (i < tabHisto.length) {
                    var t = tabHisto[i];
                    var isPlayer1 = t.Player1.Name == playerName;
                    var nbGFS = 0;
                    var player1WinFirstSet = !isPlayer1;
                    if (t.Sets.length > 0) {
                        nbGFS = t.Sets[0].Player1Score + t.Sets[0].Player2Score;
                        player1WinFirstSet = t.Sets[0].Player1Score > t.Sets[0].Player2Score;
                    }
                    var nbSetP1 = 0;
                    var nbSetP2 = 0;
                    var u = 0;
                    while (u < t.Sets.length) {
                        if (t.Sets[0].Player1Score > t.Sets[0].Player2Score) {
                            nbSetP1 += 1;
                        } else if (t.Sets[0].Player1Score < t.Sets[0].Player2Score) {
                            nbSetP2 += 1;
                        }
                        u += 1;
                    }

                    if (t.Tournament.GroundType == 3 || t.Tournament.GroundType == 3 || t.Tournament.GroundType == 5 || t.Tournament.GroundType == 7) {
                        r.hard.matchCount += 1;
                        r.hard.nbGameFirstSet += nbGFS;
                        if ((isPlayer1 && player1WinFirstSet) || (!isPlayer1 && !player1WinFirstSet)) {
                            r.hard.winFirstSet += 1;
                        }
                        if ((isPlayer1 && nbSetP1 > nbSetP2) || (!isPlayer1 && nbSetP2 > nbSetP1)) {
                            r.hard.matchWin += 1;
                        }
                    } else if (t.Tournament.GroundType == 1 || t.Tournament.GroundType == 2) {
                        r.clay.matchCount += 1;
                        r.clay.nbGameFirstSet += nbGFS;
                        if ((isPlayer1 && player1WinFirstSet) || (!isPlayer1 && !player1WinFirstSet)) {
                            r.clay.winFirstSet += 1;
                        }
                        if ((isPlayer1 && nbSetP1 > nbSetP2) || (!isPlayer1 && nbSetP2 > nbSetP1)) {
                            r.clay.matchWin += 1;
                        }
                    } else if (t.Tournament.GroundType == 6) {
                        r.grass.matchCount += 1;
                        r.grass.nbGameFirstSet += nbGFS;
                        if ((isPlayer1 && player1WinFirstSet) || (!isPlayer1 && !player1WinFirstSet)) {
                            r.grass.winFirstSet += 1;
                        }
                        if ((isPlayer1 && nbSetP1 > nbSetP2) || (!isPlayer1 && nbSetP2 > nbSetP1)) {
                            r.grass.matchWin += 1;
                        }
                    }
                    i += 1;
                }

                var _hard = {
                    matchWin: 0,
                    avgFirstSet: 0,
                    firstSetWin: 0
                };
                if (r.hard.matchCount > 0) {
                    _hard = {
                        matchWin: (r.hard.matchWin * 100 / r.hard.matchCount),
                        avgFirstSet: (r.hard.nbGameFirstSet / r.hard.matchCount).toFixed(2),
                        firstSetWin: (r.hard.winFirstSet * 100 / r.hard.matchCount).toFixed(2)
                    };
                }

                var _clay = {
                    matchWin: 0,
                    avgFirstSet: 0,
                    firstSetWin: 0
                };
                if (r.clay.matchCount > 0) {
                    _clay = {
                        matchWin: (r.clay.matchWin * 100 / r.clay.matchCount),
                        avgFirstSet: (r.clay.nbGameFirstSet / r.clay.matchCount).toFixed(2),
                        firstSetWin: (r.clay.winFirstSet * 100 / r.clay.matchCount).toFixed(2)
                    };
                }

                var _grass = {
                    matchWin: 0,
                    avgFirstSet: 0,
                    firstSetWin: 0
                };
                if (r.grass.matchCount > 0) {
                    _grass = {
                        matchWin: (r.grass.matchWin * 100 / r.grass.matchCount),
                        avgFirstSet: (r.grass.nbGameFirstSet / r.grass.matchCount).toFixed(2),
                        firstSetWin: (r.grass.winFirstSet * 100 / r.grass.matchCount).toFixed(2)
                    };
                }

                return {
                    hard: _hard,
                    clay: _clay,
                    grass: _grass
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
