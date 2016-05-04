angular.module('app').controller('NavBarController', ['$scope', '$state', '$log', 'searchInterface',
    function($scope, $state, $log, searchInterface) {

        $scope.querySearch = function(search) {
            return searchInterface.search(search).then(function(result){
                return result.Data;
            }).catch(function(result) {
                console.error(result);
                return [];
            });
        };

        $scope.goTo = function (item) {
            if (item == null) {
                return;
            }
            if (item.Player1 != null) {
                
            }
            else {

            }
            console.log(item);
        };
}]);
