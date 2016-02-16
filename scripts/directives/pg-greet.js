(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgGreet', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    selectedPerson: '=',
                },
                replace: true,
                templateUrl: 'views/components/pg-greet.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                });
            }
        }
})(window.angular);
