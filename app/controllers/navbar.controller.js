angular.module('app').controller('NavBarController', ['$scope', '$state', '$log', 'searchInterface', '$rootScope',
    function($scope, $state, $log, searchInterface, $rootScope) {

        $scope.querySearch = function(search) {
            return searchInterface.search(search).then(function(result){
                $rootScope.$emit("searchResultChanged", result.Data);
                return result.Data;
            }).catch(function(error) {
                return [];
            });
        };

        $scope.goTo = function (item) {
            if (item == null) {
                return;
            }
            if (item.Player1 != null) {
                if (item.Player1.Id !== item.Player2.Id) {
                    $state.go('matches', {
                        player1Id: item.Player1.Id,
                        player2Id: item.Player2.Id,
                        players: item
                    });
                } else {
                    item.Text = item.Player1.Name;
                    $state.go('player', {
                        playerId: item.Player1.Id,
                        player: item
                    });
                }
            }
            else {
                $state.go('player', {
                    playerId: item.Id,
                    player: item
                });
            }
        };
}]);
