angular.module('app')
.directive('vsDirective', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return element.attr('players');
            }, function(newValue) {
                if (newValue !== undefined && newValue != "") {
                    scope.p = JSON.parse(newValue);
                } else {
                    scope.p = {};
                }
            });
        },
        templateUrl: 'views/directives/vsDirective.html'
    };
});
