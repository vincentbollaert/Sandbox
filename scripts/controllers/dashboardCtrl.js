(function(angular) {
    'use strict';

    angular
        .module('webapp.controllers')
        .controller('dashboardCtrl', controller);

        function controller($scope, $interval, dataService, bgService, optionsFactory) {
            let colorsInterval, selectColorMouseDownDate;

            angular.extend($scope, {
                options: optionsFactory,
                population: JSON.parse(localStorage.getItem('population')),
                colors: JSON.parse(localStorage.getItem('colors')) || [],
                currentBackground: {},
                selectColor: selectColor,
                selectColorMouseUp: selectColorMouseUp,
                selectPerson: selectPerson,
                selectedPerson: undefined,
            });

            (function init() {
                getPopulation();
                loopThroughColors(0, true);
            })();

            $scope.$on('optionDefaultSlide', function() {
                console.log('received');
            });

            $scope.$on('optionDefaultUser', function($event, optionId) {
                let optionKeys = Object.keys(optionsFactory.model);
                let optionKey = optionKeys.filter(x => optionsFactory.model[x].id === optionId);
                if (optionsFactory.model[optionKey].value) {
                    optionsLoadDefaultPerson();
                }
            });

            $scope.$on('optionSlide', function($event, optionId) {
                let optionKeys = Object.keys(optionsFactory.model);
                let optionKey = optionKeys.filter(x => optionsFactory.model[x].id === optionId);
                if (optionsFactory.model[optionKey].value) {
                    loopThroughColors(0);
                } else {
                    loopThroughColors(0, true);
                }
            });


            // population
            function getPopulation() {
                if (!localStorage.getItem('population')) {
                    dataService().get().then((data) => {
                        localStorage.setItem('population', JSON.stringify(data));
                        $scope.population = JSON.parse(localStorage.getItem('population'));
                        optionsLoadDefaultPerson();
                    }, function() {
                          alert('fail');
                    });
                } else {
                    optionsLoadDefaultPerson();
                }
            }

            function optionsLoadDefaultPerson() {
                if (!optionsFactory.model.defaultUser.value) {
                    return;
                }
                $scope.selectedPerson = $scope.selectedPerson || $scope.population[0];
            }

            function selectPerson(person) {
                $scope.selectedPerson = person;
            }


            // colors
            if (!localStorage.getItem('colors')) {
                bgService().get().then((data) => {
                    localStorage.setItem('colors', JSON.stringify(data));
                    $scope.colors = JSON.parse(localStorage.getItem('colors'));
                });
            }

            function selectColor() {
                selectColorMouseDownDate = new Date();
            }

            function selectColorMouseUp(color, $event, $index) {

                $scope.currentBackground = color;
                if (new Date() - selectColorMouseDownDate > 1000) {
                    localStorage.setItem('defaultBackground', JSON.stringify(color));
                    loopThroughColors($index, true);
                    updateOptions('slide', false);
                } else {
                    loopThroughColors($index);
                    updateOptions('slide', true);
                }
                optionsFactory.update();
            }

            function updateOptions(option, value) {
                optionsFactory.model[option].value = value;
            }

            function loopThroughColors(colorIndex, loadFromStorage) {
                $interval.cancel(colorsInterval);

                if (loadFromStorage) {

                    if (!optionsFactory.model.defaultSlide.value || !optionsFactory.model.slide.value) {
                        loadSavedBackground();
                        return;
                    }
                }

                colorsInterval = $interval(() => {
                    if (colorIndex === $scope.colors.length) {
                        colorIndex = 0;
                    }
                    $scope.currentBackground = $scope.colors[colorIndex];
                    colorIndex += 1;
                }, 1000);
            }

            function loadSavedBackground() {
                $scope.defaultBackground = JSON.parse(localStorage.getItem('defaultBackground'));
                $scope.currentBackground = $scope.defaultBackground || $scope.colors[0];
            }
        }
})(window.angular);
