(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('droppable', directive);

        function directive() {
            return {
                scope: {},
                link: link
            };

            function link(scope, element) {
                let el = element[0];

                el.addEventListener('dragover', dragOver, false);
                el.addEventListener('dragenter', dragEnter, false);
                el.addEventListener('dragleave', dragLeave, false);
                el.addEventListener('drop', drop, false);

                function dragOver(e) {
                    e.dataTransfer.dropEffect = 'move';
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                    el.classList.add('over');
                    return false;
                }

                function dragEnter(e) {
                    el.classList.add('over');
                    return false;
                }

                function dragLeave() {
                    el.classList.remove('over');
                    return false;
                }

                function drop(e) {
                    let item = document.getElementById(e.dataTransfer.getData('Text'));
                    // console.log(e.dataTransfer.getData('Text'));

                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }

                    el.classList.remove('over');
                    el.appendChild(item);

                    return false;
                }
            }
        }
})(window.angular);
