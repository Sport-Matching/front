angular.module('app')
    .directive('linearProgressDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs) {
        scope.title = attrs.linearTitle;
        if (attrs.idLinear !== undefined && attrs.idLinear != "") {
            scope.tabElt = [{
                id: attrs.idLinear,
                showSubTitle: false,
                subTitle: ""
            }];
        } else if (attrs.tabLinear !== undefined && attrs.tabLinear != "") {
            scope.tabElt = JSON.parse(attrs.tabLinear);
        } else {
            scope.eltTab = [];
        }
    },
    templateUrl: 'views/directives/linearProgressDirective.html'
  };
});
