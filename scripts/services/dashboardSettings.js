(function(angular) {
    'use strict';

    angular.module('webapp.services')
        .factory('optionsFactory', ['$rootScope', serviceFn]);

        function serviceFn($rootScope) {

            let factory = {
                model: loadSavedModel() || {
                    defaultUser: {
                        label: 'Load default user',
                        id: 'optionDefaultUser',
                        value: false
                    },
                    slide: {
                        label: 'slide',
                        id: 'optionSlide',
                        value: false
                    },
                    defaultSlide: {
                        label: 'slide automatically',
                        id: 'optionDefaultSlide',
                        value: false
                    },
                    showColorPicker: {
                        label: 'show color picker',
                        id: 'optionShowColorPicker',
                        value: false
                    },
                    transparentScrollbars: {
                        label: 'transparent scrollbars',
                        id: 'optionTransparentScrollbars',
                        value: false
                    }
                },

                update: function(optionUpdatedId) {
                    localStorage.setItem('options', JSON.stringify(factory.model));
                    broadcastThisBitch(optionUpdatedId);
                }
            };

            function loadSavedModel() {
                if (!localStorage.getItem('options')) {
                    return;
                }

                let optionsFromStorage = JSON.parse(localStorage.getItem('options'));
                optionsFromStorage.slide.value = optionsFromStorage.defaultSlide.value;
                return optionsFromStorage;
            }

            function broadcastThisBitch(whichBitch) {
                $rootScope.$broadcast(whichBitch, whichBitch);
            }

            return factory;
        }
})(window.angular);
