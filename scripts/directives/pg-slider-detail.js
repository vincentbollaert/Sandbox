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
                    options: {},
                    rangeModel: 50,
                    setSwitch: setSwitch,
                    activeSwitch: '',
                    isDocked: {},
                    dock: dock,
                    close: close,
                    returnObjKey: returnObjKey
                });

                scope.options = {
                    open: false,
                    docked: false,
                    fullScreen: false
                };

                function setSwitch(option) {
                    scope.activeSwitch = !scope.options[option];
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
