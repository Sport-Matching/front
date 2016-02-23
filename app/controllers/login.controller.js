angular.module('app')
    .controller('LoginController', ['$scope', '$state', 'luticateAuthUsers', 'luticateAuthCache',
        function($scope, $state, luticateAuthUsers, luticateAuthCache) {
            $scope.username = "";
            $scope.password = "";
            $scope.errorString = null;

            var promiseLogin = {
                id: "promiseLogin",
                loaderGroups: ["loginForm"]
            };

            var user = luticateAuthCache.getUser();
            if (user != null) {
                $state.go('home');
                return;
            }

            $scope.login = function()
            {
                $scope.errorString = null;
                luticateAuthUsers.login({username: $scope.username, password: $scope.password}, promiseLogin)
                    .then(function(user)
                    {
                        $state.go('home');
                    }, function(error)
                    {
                        $scope.errorString = error.Data;
                    });
            };
        }
    ]);
