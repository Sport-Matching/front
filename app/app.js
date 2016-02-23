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

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $stateProvider.state('root', {
            abstract: true,
            template: '<div ui-view=""></div>',
            resolve: ['luticateAuthUsers', function(luticateAuthUsers)
            {
                return luticateAuthUsers.loadUserData(null);
            }]
        });

        //$locationProvider.html5Mode(true);

        $stateProvider.state('login',{
            url:'/',
            parent: 'root',
            templateUrl:'views/login.html',
            controller:'LoginController',
            resolve:{}
        });

        $stateProvider.state('home',{
            url:'/home',
            parent: 'root',
            templateUrl:'views/home.html',
            controller:'HomeController',
            revolve:{}
        });

        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push(['luticateAuthCache', '$injector', '$q',
            function (luticateAuthCache, $injector, $q) {
                return {
                    'request': function (config) {
                        var token = luticateAuthCache.getToken();

                        if (token != null)
                            config.headers['X-Authorization'] = token;

                        return config;
                    },
                    'responseError': function(rejection) {
                        return $q.reject(rejection);
                    }
                };
            }]);

    }])
    .directive('dateNow', ['$filter', function($filter) {
        return {
            link: function( $scope, $element, $attrs) {
                $element.text($filter('date')(new Date(), $attrs.dateNow));
            }
        };
    }])
    .run(['$rootScope', '$state',function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (e, curr, prev) {
            //$state.go('login');
        });
    }]);