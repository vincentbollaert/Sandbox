(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgSliderDetail', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    selectedPerson: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-slider-detail.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    sliderStates: {
                        docked: false,
                        fullScreen: false,
                        closed: false
                    },
                    rangeModel: 50,
                    setState: setState,
                    activeState: undefined,
                    isDocked: {}
                });

                function setState(selectedState) {
                    let keys = Object.keys(scope.sliderStates),
                        i = 0;

                    for (i; i < keys.length; i++) {
                        if (keys[i] !== selectedState) {
                            scope.sliderStates[keys[i]] = false;
                        }
                    }

                    scope.sliderStates[selectedState] = !scope.sliderStates[selectedState];
                    scope.activeState = (scope.sliderStates[selectedState] ? selectedState : undefined);

                    if (selectedState === 'closed') {
                        scope.selectedPerson = undefined;
                        scope.activeState = undefined;
                    }
                }
            }
        }
})(window.angular);
