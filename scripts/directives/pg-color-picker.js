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
                    showColorPicker: false
                });

                // let downDate;
                // function selectColor(color, $event) {
                //     // $event.target.style.boxShadow = 'inset 0 0 0 10px' + ' #444';
                //     downDate = new Date();
                // }

                // function selectColorDone(color, $event) {
                //     // $event.target.style.boxShadow = 'inset 0 0 0 2px #444';
                //     // if ($event.timeStamp > 10000) {
                //         if (new Date() - downDate > 1000) {
                //             $event.target.classList.add('is-active');
                //         } else {
                //             $event.target.classList.remove('is-active');
                //         }
                //     // }
                // }
            }
        }
})(window.angular);
