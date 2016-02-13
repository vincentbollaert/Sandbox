(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgSliderDetail', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        selectedPerson: '='
                    },
                    replace: true,
                    templateUrl: 'views/components/pg-slider-detail.html',

                    link: (scope) => {
                        console.log(scope, 'scope');
                        scope.test = 'test';
                    }
                };
            }
        ]);
})(window.angular);
