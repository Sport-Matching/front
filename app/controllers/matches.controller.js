angular.module('app')
    .controller('MatchesController', ['$scope', '$stateParams', 'vsInterface',
        function($scope, $stateParams, vsInterface){
            $scope.isLoading = true;
            $scope.isNoContentFound = false;
            $scope.haveContent = false;
            $scope.player = undefined;

            if ($stateParams.player1Id !== undefined && $stateParams.player2Id !== undefined) {
                vsInterface.get($stateParams.player1Id, $stateParams.player2Id, function(success, error, response) {
                    if (success) {
                        $scope.isLoading = false;
                        $scope.isNoContentFound = false;
                        $scope.players = response;
                        $scope.haveContent = true;
                    } else {
                        $scope.isLoading = false;
                        $scope.isNoContentFound = true;
                        $scope.haveContent = false;
                    }
                });
            } else {
                $scope.isLoading = false;
                $scope.isNoContentFound = true;
                $scope.haveContent = false;
            }
}]);
