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
    'appSdk',
    'ngMaterial'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //$locationProvider.html5Mode(true);

        $stateProvider.state('home',{
            url:'/',
            title: 'Accueil',
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
    }])
    .run(['$rootScope', '$state',
        function ($rootScope, $state) {
            $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {
                $rootScope.title = current.title + " - Sport-Matching";
            });
        }]);