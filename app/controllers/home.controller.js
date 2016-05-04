angular.module('app')
    .controller('HomeController', ['$scope',
        function($scope){
            $scope.isLoading = false;
            $scope.isNoContentFound = true;
            $scope.showPlayerPart = false;
            $scope.showVSPart = false;
}]);
