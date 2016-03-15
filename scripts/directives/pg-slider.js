(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgSlider', directive );

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    population: '=',
                    selectPerson: '=',
                    selectedPerson: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-slider.html',
                link: link
            };

            function link(scope) {
                let slider = document.querySelector('.slider'),
                    sliderIncr = 0,
                    dimensions = {
                        width: slider.getBoundingClientRect().width,
                        height: slider.getBoundingClientRect().height
                    };

                const ITEMS_PER_SLIDE = 4;

                angular.extend(scope, {
                    slideNavigate: slideNavigate,
                    firstSlide: false,
                    lastSlide: false
                });

                init();

                function init() {
                    disableArrows();
                }

                function slideNavigate(direction) {
                    incrOrDecr(direction);
                    disableArrows();
                    slider.style.transform = 'translateX(' + sliderIncr * dimensions.width + 'px' + ')';
                }

                function incrOrDecr(direction) {
                    if (direction === 'prev' && !scope.firstSlide) {
                        sliderIncr++;
                    }
                    if (direction === 'next' && !scope.lastSlide) {
                        sliderIncr--;
                    }
                }

                function disableArrows() {
                    scope.firstSlide = (sliderIncr === 0 ? true : false);
                    scope.lastSlide = (sliderIncr === Math.ceil(scope.population.length / -ITEMS_PER_SLIDE) ? true : false);
                }
            }
        }
})(window.angular);
