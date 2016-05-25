//historicDirective
angular.module('app')
.directive('historicDirective', [function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs) {
            scope.tmpTabHistoric = [];
            scope.tabHistoric = [];
            scope.contentOnHistoryPart = scope.tabHistoric.length > 0;
            scope.haveMoreContent = scope.tmpTabHistoric.length > 0;

            scope.$watch(function() {
                return element.attr('hist');
            }, function(newValue) {
                if (attrs.hist !== undefined && attrs.hist != "") {
                    scope.tmpTabHistoric = JSON.parse(attrs.hist);
                }
                scope.tabHistoric = [];
                var i = 0;
                while (i < 5 && scope.tmpTabHistoric.length > 0) {
                    scope.tabHistoric.push(scope.tmpTabHistoric[0]);
                    scope.tmpTabHistoric.splice(0, 1);
                    i += 1;
                }
                scope.contentOnHistoryPart = scope.tabHistoric.length > 0;
                scope.haveMoreContent = scope.tmpTabHistoric.length > 0;
            });

            scope.showMoreButtonAction = function() {
                var i = 0;
                while (i < 5 && scope.tmpTabHistoric.length > 0) {
                    scope.tabHistoric.push(scope.tmpTabHistoric[0]);
                    scope.tmpTabHistoric.splice(0, 1);
                    i += 1;
                }
                scope.haveMoreContent = scope.tmpTabHistoric.length > 0;
            };
        },
        templateUrl: 'views/directives/historicDirective.html'
    };
}]);
