/**
* Created by robin on 11/1/15.
*/

/*angular.module('app')
.controller('NavBarController', ['$scope', 'luticateAuthCache', 'luticateAuthUsers', '$state',
function($scope, luticateAuthCache, luticateAuthUsers, $state) {


$scope.search = {
text: ""
};
}]);*/

angular.module('app').controller('NavBarController', ['$scope', '$state', '$log', function($scope, $state, $log) {
    /*$scope.search = {
        text: ""
    };*/

    $scope.querySearch = function(search) {
        var tab = ["nadal vs federer", "nadal vs tsonga", "murray vs nadal", "gasquet vs tsonga", "gabashvili sv tsonga", "ferrer", "nadal", "federer", "tsonga", "isner", "gasquet", "gabashvili", "roland garros", "wimbledon", "geneva", "gstaad"];
        var customFilter = function(q) {
            var lower = angular.lowercase(q);
            return function(t) {
                return (t.indexOf(lower) >= 0);
            }
        }
        return search ? tab.filter( customFilter(search) ) : tab;
    }
}]);
