(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgToasts', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: 'views/components/pg-toasts.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    toasts: []
                });

                scope.toasts = [
                    {
                        type: 'bad',
                        message: 'This is an error message from api. The data coould not be loaded'
                    }, {
                        type: 'info',
                        message: 'This is an info message. Use still to be decided'
                    }
                ];
            }
        }
})(window.angular);
