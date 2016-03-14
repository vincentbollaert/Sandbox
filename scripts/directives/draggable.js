(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('draggable', directive);

        function directive($timeout) {
            return function(scope, element) {
                let el = element[0],
                    timeStamps = [],
                    x = [],
                    y = [];

                const FRICTION = 5;
                const FORCE = 500;

                el.draggable = true;
                el.addEventListener('dragstart', dragStart, false);
                el.addEventListener('drag', drag, false);
                el.addEventListener('dragend', dragEnd, false);

                function dragStart(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', el.id);
                    el.classList.add('drag');
                    return false;
                }

                function drag(e) {
                    e.stopPropagation();
                    e.preventDefault();

                    timeStamps.push(e.timeStamp);
                    if (e.x > 0) {
                        x.push(e.x);
                    }
                    if (e.y > 0) {
                        y.push(e.y);
                    }

                    el.style.transition = 'transform 0s ease-out';
                    el.style.transform = 'translate(0, 0)';
                    el.style.top = (e.y + e.layerY) + 'px';
                    el.style.left = (e.x + e.layerX) + 'px';

                    if (e.x > 300) {
                        el.classList.remove('within-range');
                    }
                        el.style.visibility = 'hidden';

                    // console.log(el.style.left, 'x');
                    return false;
                }

                function dragEnd(e) {
                el.style.visibility = 'visible';
                    e.stopPropagation();
                    e.preventDefault();

                    let minTimeStamp = Math.min.apply(Math, timeStamps),
                        maxTimeStamp = Math.max.apply(Math, timeStamps),
                        seconds = (maxTimeStamp - minTimeStamp) / 1000,
                        distanceX = x[x.length - 1] - x[0],
                        distanceY = y[y.length - 1] - y[0],
                        topOffset = ((distanceY / seconds) / FRICTION),
                        leftOffset = ((distanceX / seconds) / FRICTION),
                        timeInMotion = ((Math.max(Math.abs(distanceX), Math.abs(distanceY)) / seconds) / FRICTION) / FORCE;

                    // console.log(el.style.left, 'el left');
                    // console.log(e.x, 'E.X');
                    el.style.top = e.y + 'px';
                    el.style.left = e.x + 'px';

                    // stop if no flick
                    if (x[x.length - 1] - x[x.length - 5] === 0) {
                        // el.style.transform = 'translateY(-100%)';
                        // console.log('boom stay');
                    } else {
                        el.style.transform = 'translate(' + leftOffset + 'px, ' + topOffset + 'px)';
                        el.style.transition = 'transform ' + timeInMotion + 's ease-out';
                    }
                    //
                    if (e.x + leftOffset < 300) {
                        leftOffset = e.x;
                        el.style.transform = 'translate(' + -leftOffset + 'px, ' + -e.y + 'px)';
                        el.style.transition = 'transform ' + timeInMotion + 's ease-out, bottom ' + timeInMotion + 's ease-out, height ' + timeInMotion + 's ease-out, width ' + timeInMotion + 's ease-out';
                        el.classList.add('within-range');
                    }
                                        // console.log(el.style.left, distanceX, 'x after drop, distanceX');

                    el.classList.remove('drag');
                    timeStamps = [];
                    x = [];
                    y = [];
                    return false;
                }
            };
        }
})(window.angular);
