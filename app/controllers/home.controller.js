angular.module('app')
    .controller('HomeController', ['$scope',
        function($scope){
            $scope.isLoading = true;
            $scope.isNoContentFound = true;
            $scope.showPlayerPart = true;
    }]);
