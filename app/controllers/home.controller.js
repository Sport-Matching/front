angular.module('app')
    .controller('HomeController', ['$scope',
        function($scope){
            $scope.isLoading = false;
            $scope.isNoContentFound = false;
            $scope.showPlayerPart = false;
            $scope.showVSPart = true;
}]);
