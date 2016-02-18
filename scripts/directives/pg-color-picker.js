(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgColorPicker', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    colors: '=',
                    backgrounds: '=',
                    selectColor: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-color-picker.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    showColorPicker: false,
                    toggleColorPicker: toggleColorPicker
                });

                function toggleColorPicker() {
                    scope.showColorPicker = !scope.hidePicker;
                }
            }
        }
})(window.angular);
