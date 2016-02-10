(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgColorPicker', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        colors: '=',
                        selectColor: '='
                    },
                    replace: true,
                    templateUrl: 'views/components/pg-color-picker.html',

                    link: (scope) => {

                        scope.showColorPicker = false;

                        scope.toggleColorPicker = () => {
                            scope.showColorPicker = !scope.hidePicker;
                        };

                        // scope.selectColor = (color) => {
                        //     scope.selectTest(color);
                        // };
                    }
                };
            }
        ]);
})(window.angular);
