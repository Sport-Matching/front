//historicDirective
angular.module('app')
    .directive('historicDirective', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        var tabHistoric = [{tournament: "Winbledon",
                            matchs: [{date: "03/07/2016", player1: "Rafael NADAL", player2: "Roger FEDERER", player1Set1: 6, player2Set1: 4, player1Set2: 4, player2Set2: 6, player1Set3: 3, player2Set3: 6, player1Set4: 3, player2Set4: 6},
                                    {date: "02/07/2016", player1: "Gaël MONFILS", player2: "Rafael NADAL", player1Set1: 1, player2Set1: 6, player1Set2: 4, player2Set2: 6, player1Set3: 3, player2Set3: 6}]},
                  {tournament: "Roland Garros",
                            matchs: [{date: "28/05/2016", player1: "Rafael NADAL", player2: "Roger FEDERER", player1Set1: 6, player2Set1: 4, player1Set2: 4, player2Set2: 6, player1Set3: 3, player2Set3: 6, player1Set4: 3, player2Set4: 6},
                                     {date: "27/05/2016", player1: "Gaël MONFILS", player2: "Rafael NADAL", player1Set1: 1, player2Set1: 6, player1Set2: 4, player2Set2: 6, player1Set3: 3, player2Set3: 6}]}];

        scope.contentOnHistoryPart = tabHistoric.lenght !== 0;
        scope.tabHistoric = tabHistoric;
    },
    templateUrl: 'views/directives/historicDirective.html'
  };
}]);
