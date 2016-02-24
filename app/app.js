'use strict';

/* App Module */

var app = angular.module('app', [
    'ui.bootstrap',
    'ui.router',
    'LocalStorageModule',
    'dialogs.main',
    'ngSanitize',
    'luticateUtils',
    'luticateAuth',
    'appSdk'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //$locationProvider.html5Mode(true);

        $stateProvider.state('home',{
            url:'/home',
            templateUrl:'views/home.html',
            controller:'HomeController',
            revolve:{}
        });

        $urlRouterProvider.otherwise('/');

    }])
    .directive('dateNow', ['$filter', function($filter) {
        return {
            link: function( $scope, $element, $attrs) {
                $element.text($filter('date')(new Date(), $attrs.dateNow));
            }
        };
    }]);