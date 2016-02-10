(function(angular) {
    'use strict';

    angular
        .module('webapp.routes', ['ngRoute'])
        .config(['$routeProvider',
            function($routeProvider) {

                $routeProvider
                    .when('/', {
                        templateUrl: 'views/dashboard.html',
                        controller: 'dashboardCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);
})(window.angular);
