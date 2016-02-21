(function(angular) {
    'use strict';

    angular.module('webapp.services')
        .service('bgService', ['$q', '$http', service]);

        function service($q, $http) {

            let service = () => {
                return {
                    get: () => {
                        var q = $q.defer();
                            $http.get('https://api.myjson.com/bins/24q0n')
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
})(window.angular);
