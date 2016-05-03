//historicDirective
angular.module('app')
    .directive('historicDirective', [function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        var tabHistoric = [];
        if (attrs.hist !== undefined) {
            tabHistoric = JSON.parse(attrs.hist);
        }
        scope.contentOnHistoryPart = tabHistoric.length !== 0;
        scope.tabHistoric = tabHistoric;
    },
    templateUrl: 'views/directives/historicDirective.html'
  };
}]);
