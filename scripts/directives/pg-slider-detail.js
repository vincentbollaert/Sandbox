(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgSliderDetail', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    selectedPerson: '=',
                    peopleDocLength: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-slider-detail.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    options: {},
                    rangeModel: 50,
                    setOption: setOption,
                    isDocked: {},
                    dock: dock,
                    close: close,
                    returnObjKey: returnObjKey
                });

                scope.options = {
                    open: false,
                    dockStates: [{
                        partial: false
                    },{
                        full: false
                    }]
                };

                function setOption (option, optionParent) {
                    if (optionParent) {
                        scope.options[optionParent][scope.returnObjKey(option)] = !scope.options[optionParent][scope.returnObjKey(option)];
                    }
                    console.log(scope.options[optionParent][scope.returnObjKey(option)]);
                }

                function dock(option) {
                    scope.isDocked[option] = !scope.isDocked[option];
                    console.log(scope.isDocked);
                }

                function close() {
                    scope.isDocked = {};
                    scope.selectedPerson = false;
                }

                function returnObjKey(obj) {
                    return Object.keys(obj)[0];
                }
            }
        }
})(window.angular);
