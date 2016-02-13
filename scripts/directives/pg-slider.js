(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgSlider', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        peopleDoc: '=',
                        selectPerson: '=',
                        selectedPerson: '='
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

                        scope.slideNavigate = function(direction) {
                            incrOrDecr(direction);

                            // if (direction === 'prev') {
                            // }
                            // if (direction === 'next') {
                            //     // console.log('NEXT');
                            // }

                            slider.style.transform = 'translateX(' + sliderIncr * dimensions.width + 'px' + ')';
                        };

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
