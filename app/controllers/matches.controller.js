angular.module('app')
    .controller('PlayerController', ['$scope', '$stateParams',
        function($scope, $stateParams){
            $scope.player = $stateParams.player;
}]);
