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
            title: 'Home',
            templateUrl:'views/home.html',
            controller:'HomeController'
        });

        $stateProvider.state('matches',{
            url:'/matches/:player1Id/vs/:player2Id',
            title: 'Player VS player',
            templateUrl:'views/matches.html',
            controller:'MatchesController',
            params: {
                'players': null
            }
        });

        $stateProvider.state('player',{
            url:'/player/:playerId',
            title: 'Player',
            templateUrl:'views/player.html',
            controller:'PlayerController',
            params: {
                'player': null
            }
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
