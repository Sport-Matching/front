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
                var isPlayer1 = t.Player1.Name === playerName;
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
                    if (t.Sets[u] !== null && t.Sets[u].Player1Score !== null && t.Sets[u].Player2Score !== null) {
                        if (t.Sets[u].Player1Score > t.Sets[u].Player2Score) {
                            nbSetP1 += 1;
                        } else if (t.Sets[u].Player1Score < t.Sets[u].Player2Score) {
                            nbSetP2 += 1;
                        }
                    }
                    u += 1;
                }

                if (t.Tournament.GroundType === 9 || t.Tournament.GroundType === 11 || t.Tournament.GroundType === 12 || t.Tournament.GroundType === 14) {
                    r.hard.matchCount += 1;
                    r.hard.nbGameFirstSet += nbGFS;
                    if ((isPlayer1 && player1WinFirstSet) || (!isPlayer1 && !player1WinFirstSet)) {
                        r.hard.winFirstSet += 1;
                    }
                    if ((isPlayer1 && nbSetP1 > nbSetP2) || (!isPlayer1 && nbSetP2 > nbSetP1)) {
                        r.hard.matchWin += 1;
                    }
                } else if (t.Tournament.GroundType === 8 || t.Tournament.GroundType === 13) {
                    r.clay.matchCount += 1;
                    r.clay.nbGameFirstSet += nbGFS;
                    if ((isPlayer1 && player1WinFirstSet) || (!isPlayer1 && !player1WinFirstSet)) {
                        r.clay.winFirstSet += 1;
                    }
                    if ((isPlayer1 && nbSetP1 > nbSetP2) || (!isPlayer1 && nbSetP2 > nbSetP1)) {
                        r.clay.matchWin += 1;
                    }
                } else if (t.Tournament.GroundType === 10) {
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

        helper.generateVSStat = function(player1Name, player2Name, tabHistoPlayer1, tabHistoPlayer2, tabHistoVS) {
            var statPlayer1 = helper.generateStat(player1Name, tabHistoPlayer1);
            var statPlayer2 = helper.generateStat(player2Name, tabHistoPlayer2);

            var tWinVSPlayer1 = {
                hard: {
                    count: 0,
                    win: 0
                },
                clay: {
                    count: 0,
                    win: 0
                },
                grass: {
                    count: 0,
                    win: 0
                }
            };
            var i = 0;
            while (i < tabHistoVS.length) {
                var t = tabHistoVS[i];
                var player1IsThePlayer1 = t.Player1.Name === player1Name;

                var nbSetP1 = 0;
                var nbSetP2 = 0;
                var u = 0;
                while (u < t.Sets.length) {
                    if (t.Sets[u] !== null && t.Sets[u].Player1Score !== null && t.Sets[u].Player2Score !== null) {
                        if (t.Sets[u].Player1Score > t.Sets[u].Player2Score) {
                            nbSetP1 += 1;
                        } else if (t.Sets[u].Player1Score < t.Sets[u].Player2Score) {
                            nbSetP2 += 1;
                        }
                    }
                    u += 1;
                }

                if (t.Tournament.GroundType === 9 || t.Tournament.GroundType === 11 || t.Tournament.GroundType === 12 || t.Tournament.GroundType === 14) {
                    tWinVSPlayer1.hard.count += 1;
                    if ((player1IsThePlayer1 && nbSetP1 > nbSetP2) || (!player1IsThePlayer1 && nbSetP2 > nbSetP1)) {
                        tWinVSPlayer1.hard.win += 1;
                    }
                } else if (t.Tournament.GroundType === 8 || t.Tournament.GroundType === 13) {
                    tWinVSPlayer1.clay.count += 1;
                    if ((player1IsThePlayer1 && nbSetP1 > nbSetP2) || (!player1IsThePlayer1 && nbSetP2 > nbSetP1)) {
                        tWinVSPlayer1.clay.win += 1;
                    }
                } else if (t.Tournament.GroundType === 10) {
                    tWinVSPlayer1.grass.count += 1;
                    if ((player1IsThePlayer1 && nbSetP1 > nbSetP2) || (!player1IsThePlayer1 && nbSetP2 > nbSetP1)) {
                        tWinVSPlayer1.grass.win += 1;
                    }
                }
                i += 1;
            }
            var wvs = {
                hard: -1,
                clay: -1,
                grass: -1
            };
            if (tWinVSPlayer1.hard.count > 0) {
                wvs.hard = (tWinVSPlayer1.hard.win * 100 / tWinVSPlayer1.hard.count);
            }
            if (tWinVSPlayer1.clay.count > 0) {
                wvs.clay = (tWinVSPlayer1.clay.win * 100 / tWinVSPlayer1.clay.count);
            }
            if (tWinVSPlayer1.grass.count > 0) {
                wvs.grass = (tWinVSPlayer1.grass.win * 100 / tWinVSPlayer1.grass.count);
            }

            return {
                name: {
                    player1: player1Name,
                    player2: player2Name
                },
                hard: {
                    player1: statPlayer1.hard,
                    player2: statPlayer2.hard,
                    winVS: wvs.hard
                },
                clay: {
                    player1: statPlayer1.clay,
                    player2: statPlayer2.clay,
                    winVS: wvs.clay
                },
                grass: {
                    player1: statPlayer1.grass,
                    player2: statPlayer2.grass,
                    winVS: wvs.grass
                }
            };
        }

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
