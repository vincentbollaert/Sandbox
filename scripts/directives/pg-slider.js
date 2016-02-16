(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgSlider', directive );

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    peopleDoc: '=',
                    selectPerson: '=',
                    selectedPerson: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-slider.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    slideNavigate: slideNavigate
                });

                let slider = document.querySelector('.slider');
                let sliderIncr = 0;
                let dimensions = {
                    width: slider.getBoundingClientRect().width,
                    height: slider.getBoundingClientRect().height
                };

                function slideNavigate(direction) {
                    incrOrDecr(direction);

                    slider.style.transform = 'translateX(' + sliderIncr * dimensions.width + 'px' + ')';
                }

                function incrOrDecr(direction) {
                    if (direction === 'prev') {
                        sliderIncr++;
                    }
                    if (direction === 'next') {
                        sliderIncr--;
                    }
                }
            }
        }
})(window.angular);
