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

                    link: (scope, element) => {
                        console.log(scope, 'scope');
                        scope.test = 'test';
                        scope.detailResize = (option) => {
                            console.log(option, element);
                        };
                    }
                };
            }
        ]);
})(window.angular);
