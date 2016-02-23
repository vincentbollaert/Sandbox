(function(angular) {
    'use strict';

    angular
        .module('webapp.controllers')
        .controller('dashboardCtrl', controller);

        function controller($scope, $interval, dataService, bgService) {
            angular.extend($scope, {
                population: JSON.parse(localStorage.getItem('population')),
                colors: JSON.parse(localStorage.getItem('colors')) || [],
                currentBackground: {},
                selectColor: selectColor,
                selectColorMouseUp: selectColorMouseUp,
                selectPerson: selectPerson,
                selectedPerson: undefined
            });

            let colorsInterval, selectColorMouseDownDate;

            (function init() {
                loadSavedBackground();
                setCurrentBackground(0, true);
            })();


            // population
            if (!localStorage.getItem('population')) {
                dataService().get().then((data) => {
                    localStorage.setItem('population', JSON.stringify(data));
                    $scope.population = localStorage.getItem('population');
                }, function() {
                      alert('fail');
                });
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
                    setCurrentBackground(0, true);
                } else {
                    setCurrentBackground($index);
                }
            }


            function setCurrentBackground(colorIndex, loadFromStorage) {
                $interval.cancel(colorsInterval);

                if (loadFromStorage) {
                    loadSavedBackground();
                    return;
                }

                colorsInterval = $interval(() => {
                    colorIndex += 1;
                    if (colorIndex === $scope.colors.length) {
                        colorIndex = 0;
                    }
                    $scope.currentBackground = $scope.colors[colorIndex];
                }, 1000);
            }

            function loadSavedBackground() {
                $scope.defaultBackground = JSON.parse(localStorage.getItem('defaultBackground'));
                $scope.currentBackground = $scope.defaultBackground || $scope.colors[0];
            }
        }
})(window.angular);
