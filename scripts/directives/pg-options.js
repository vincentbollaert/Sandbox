(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgOptions', directive);

        function directive(optionsFactory) {
            return {
                restrict: 'E',
                scope: {
                    // colors: '=',
                    // selectColor: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-options.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    options: optionsFactory
                });
            }
        }
})(window.angular);
