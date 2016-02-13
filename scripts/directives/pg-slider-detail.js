(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgSliderDetail', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        selectedPerson: '=',
                        peopleDocLength: '='
                    },
                    replace: true,
                    templateUrl: 'views/components/pg-slider-detail.html',

                    link: (scope) => {
                        scope.isDocked = {
                            partial: false,
                            full: false
                        };

                        scope.dock = (option) => {
                            if (option === 'full') scope.isDocked.partial = false;
                            if (option === 'partial') scope.isDocked.full = false;
                            scope.isDocked[option] = !scope.isDocked[option];
                        };

                        scope.close = () => {
                            scope.isDocked.partial = false;
                            scope.isDocked.full = false;
                            scope.selectedPerson = false;
                        };
                    }
                };
            }
        ]);
})(window.angular);
