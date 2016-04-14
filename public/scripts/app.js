'use strict';

angular
    .module('shiftApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/workbench');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .state('workbench', {
                url: '/workbench',
                templateUrl: 'views/workbench.html',
                controller: 'WorkbenchCtrl'
            })
            // .state('events', {
            //     url: '/events?page',
            //     templateUrl: 'views/events/list.html',
            //     controller: 'EventsCtrl'
            // })
            // .state('events.detail', {
            //     url: '/detail?id',
            //     templateUrl: 'views/events/detail.html',
            //     controller: 'EventsDetailCtrl'
            // })
    });
