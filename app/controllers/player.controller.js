angular.module('app')
    .controller('PlayerController', ['$scope', '$stateParams', '$http', 'playerInterface',
        function($scope, $stateParams, $http, playerInterface){
            $scope.player = {
                description: {},
                predicts: [],
                stats: {
                },
                histo: []
            };
            var playerId = $stateParams.playerId;
            if (playerId !== undefined) {
                $scope.isLoading = true;
                $scope.haveContent = false;
                $scope.isNoContentFound = false;

                playerInterface.get(playerId, function(success, error, data) {
                    if (success && data !== undefined) {
                        $scope.isLoading = false;
                        $scope.player = data;
                        $scope.isNoContentFound = false;
                        $scope.haveContent = true;
                    } else {
                        $scope.isLoading = false;
                        $scope.player = undefined;
                        $scope.isNoContentFound = true;
                        $scope.haveContent = false;
                    }
                });
            } else {
                $scope.isLoading = false;
                $scope.haveContent = false;
                $scope.isNoContentFound = true;
            }
}]);
