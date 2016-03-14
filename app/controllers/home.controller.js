angular.module('app')
    .controller('HomeController', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog',
        function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
            $scope.showPlayerPart = true;
            $scope.showPlayerStatPart = true;
    }]);
