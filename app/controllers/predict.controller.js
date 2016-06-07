angular.module('app').controller('PredictController', ['$scope', '$state', '$log', 'searchInterface', 'errorDialogMd', 'player',
    function($scope, $state, $log, searchInterface, errorDialogMd, player) {

        $scope.querySearch = function(search) {
            return searchInterface.search(search).then(function(result){
                return result.Data;
            }).catch(function(error) {
                console.error(error);
                //errorDialogMd.errorDialog(error);
                return [];
            });
        };

        $scope.goTo = function (item) {
            if (item == null) {
                return;
            }
            console.log(item);
            if (item.Player1 != null) {
                if (item.Player1.Id !== item.Player2.Id) {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();

                    if(dd<10) {
                        dd='0'+dd
                    }

                    if(mm<10) {
                        mm='0'+mm
                    }

                    today = yyyy+'-'+mm+'-'+dd;
                    player.getPrediction(item.Player1.Name, item.Player2.Name, today).then(function(result){
                        $scope.result = result;
                    });
                }
            }
        };
        
    }]);
