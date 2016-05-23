angular.module('app')
    .controller('HomeController', ['$scope',
        function($scope){
            $scope.isNoContentFound = true;
            $scope.showPlayerPart = false;
            $scope.showVSPart = false;
}]);
