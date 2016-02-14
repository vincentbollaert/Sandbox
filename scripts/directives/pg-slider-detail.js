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
                        scope.options = {
                            open: false,
                            dockStates: [{
                                partial: false
                            },{
                                full: false
                            }]
                        };

                        scope.rangeModel = 50;

                        scope.setOption = (option, optionParent) => {
                            if (optionParent) {
                                scope.options[optionParent][scope.returnObjKey(option)] = !scope.options[optionParent][scope.returnObjKey(option)];
                            }
                            console.log(scope.options[optionParent][scope.returnObjKey(option)]);
                        };

                        scope.dock = (option) => {
                            // scope.isDocked = {};
                            scope.isDocked[option] = !scope.isDocked[option];

                            console.log(scope.isDocked);
                        };

                        scope.close = () => {
                            scope.isDocked = {};
                            scope.selectedPerson = false;
                        };

                        scope.returnObjKey = (obj) => {
                            return Object.keys(obj)[0];
                        }
                    }
                };
            }
        ]);
})(window.angular);
