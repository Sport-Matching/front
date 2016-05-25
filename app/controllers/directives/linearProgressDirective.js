angular.module('app')
    .directive('linearProgressDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.tabElt = [];

        scope.$watch(function() {
            return element.attr('tab-linear');
        }, function(newValue) {
            if (attrs.tabLinear !== undefined && attrs.tabLinear != "") {
                scope.title = attrs.linearTitle;
                scope.tabElt = JSON.parse(attrs.tabLinear);
            }
        });

        scope.$watch(function() {
            return element.attr('id-linear');
        }, function(newValue) {
            if (attrs.idLinear !== undefined && attrs.idLinear != "") {
                scope.title = attrs.linearTitle;
                scope.tabElt = [{
                    id: attrs.idLinear,
                    showSubTitle: false,
                    subTitle: ""
                }];
            }
        });
    },
    templateUrl: 'views/directives/linearProgressDirective.html'
  };
});
