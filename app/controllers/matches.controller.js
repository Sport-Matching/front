angular.module('app')
    .controller('MatchesController', ['$scope', '$stateParams',
        function($scope, $stateParams){
            $scope.players = $stateParams.players;
}]);
