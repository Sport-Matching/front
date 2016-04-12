angular.module('app').controller('NavBarController', ['$scope', '$state', '$log', 'searchInterface',
    function($scope, $state, $log, searchInterface) {
    /*$scope.search = {
        text: ""
    };*/

    $scope.querySearch = function(search) {
        var tab = [];
        return searchInterface.search(search).then(function(result){
            console.log(result);
            tab = result.Data.map(function(e){return e.Name});
            return tab;
        }).catch(function(result){
            console.error(result);
            return [];
        });
    }
}]);
