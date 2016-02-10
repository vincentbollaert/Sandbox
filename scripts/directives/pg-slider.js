(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgSlider', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        people: '=',
                        selectPerson: '='
                    },
                    replace: true,
                    templateUrl: 'views/components/pg-slider.html',

                    link: (scope, element) => {
                        let slider = document.querySelector('.slider');
                        let sliderIncr = 0;
                        let sliderPrev = document.querySelector('.js-slide-prev');
                        let sliderNext = document.querySelector('.js-slide-next');

                        let dimensions = {
                            width: slider.getBoundingClientRect().width,
                            height: slider.getBoundingClientRect().height
                        };

                        sliderPrev.addEventListener('click', prev);
                        sliderNext.addEventListener('click', next);

                        function prev() { slide('prev'); }
                        function next() { slide('next'); }

                        function slide(direction) {

                            incrOrDecr(direction);

                            console.log(sliderIncr);

                            if (direction === 'prev') {
                                console.log(dimensions.width, slider.style);
                            }
                            if (direction === 'next') {
                                console.log('NEXT');
                            }

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
                };
            }
        ]);
})(window.angular);
