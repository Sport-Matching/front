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

angular.module('app').controller('NavBarController', ['$scope', '$state', function($scope, $state) {
    $scope.search = {
        text: ""
    };
}]);
