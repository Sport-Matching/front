/**
 * Created by robin on 11/1/15.
 */

angular.module('app')
    .controller('NavBarController', ['$scope', 'luticateAuthCache', 'luticateAuthUsers', '$state',
        function($scope, luticateAuthCache, luticateAuthUsers, $state) {


            $scope.logout = function()
            {
                var promiseLogout = {
                    id: "promiseLogout",
                    loaderGroups: ["body"]
                };
                luticateAuthUsers.logout(promiseLogout).finally(function()
                {
                    $state.go('login');
                });
            };

            $scope.isLogged = function()
            {
                var user = luticateAuthCache.getUser();
                return user != null && user.Id != 0;
            };

            $scope.getUsername = function()
            {
                var user = luticateAuthCache.getUser();
                if (user != null) {
                    return user.Username;
                }
                return "";
            };

            $scope.canSeeAdmin = function()
            {
                return luticateAuthCache.hasOneEffectivePermission([
                    "LU_USER_GET",
                    "LU_GROUP_GET",
                    "LU_PERM_GET",
                    "ADMIN_PERMISSION"
                ]);
            };
        }]);
