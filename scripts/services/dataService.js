(function(angular) {
    'use strict';

    angular.module('webapp.services')
        .service('dataService', ['$q', '$http',
            function($q, $http) {

                let service = () => {
                    return {
                        get: () => {
                            var q = $q.defer();
                                $http.get('https://api.myjson.com/bins/y0id')
                                    .success((data) => {
                                        q.resolve(data);
                                        // q.reject('GIFT FAIL')
                                    });

                            return q.promise;
                        }
                    };
                };

                return service;
            }
        ]);
})(window.angular);
