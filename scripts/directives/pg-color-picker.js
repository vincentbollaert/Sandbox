(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgColorPicker', ['optionsFactory', directive]);

        function directive(optionsFactory) {
            return {
                restrict: 'E',
                scope: {
                    colors: '=',
                    backgrounds: '=',
                    currentBackground: '=',
                    selectColor: '=',
                    selectColorMouseUp: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-color-picker.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    showColorPicker: false,
                    options: optionsFactory
                });
            }
        }
})(window.angular);
