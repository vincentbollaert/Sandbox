(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgGreet', directive);

        function directive($filter) {
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
                    dateDay: $filter('date')(new Date(), 'EEEE'),
                    date: $filter('date')(new Date(), 'MMMM d - H:mm')
                });
            }
        }
})(window.angular);
