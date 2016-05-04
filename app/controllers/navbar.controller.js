angular.module('app').controller('NavBarController', ['$scope', '$state', '$log', 'searchInterface', 'errorDialogMd',
    function($scope, $state, $log, searchInterface, errorDialogMd) {

        $scope.querySearch = function(search) {
            return searchInterface.search(search).then(function(result){
                return result.Data;
            }).catch(function(error) {
                console.error(error);
                errorDialogMd.errorDialog(error);
                return [];
            });
        };

        $scope.goTo = function (item) {
            if (item == null) {
                return;
            }
            if (item.Player1 != null) {
                $state.go('matches', {
                    player1Id: item.Player1.Id,
                    player2Id: item.Player2.Id,
                    players: item
                });
            }
            else {
                $state.go('player', {
                    playerId: item.Id,
                    player: item
                });
            }
            console.log(item);
        };
}]);
