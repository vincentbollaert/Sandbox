﻿(function(angular) {
    'use strict';

    angular
        .module('webapp.controllers')
        .controller('dashboardCtrl', controller);

        function controller($scope, $timeout, dataService, bgService) {
            angular.extend($scope, {
                population: JSON.parse(localStorage.getItem('population')),
                colors: JSON.parse(localStorage.getItem('colors')) || [],
                slideAmt: 0,
                people: [],
                averageBalance: 0,
                selectedPerson: undefined,
                selectedColor: {},
                test: ''
            });

            let timeout;
            let updateCurrentColor;

            if (!localStorage.getItem('population')) {
                dataService().get().then((data) => {
                    localStorage.setItem('population', JSON.stringify(data));
                    $scope.population = localStorage.getItem('population');
                }, function() {
                      alert('fail');
                });
            }

            (function init() {
                updateBackground();
                loopThroughColors();
            })();


            $scope.selectPerson = (person) => {
                $scope.selectedPerson = person;
            };

            if (!localStorage.getItem('colors')) {
                bgService().get().then((data) => {
                    localStorage.setItem('colors', JSON.stringify(data));
                    $scope.colors = JSON.parse(localStorage.getItem('colors'));
                });
            }

            let downDate;
            $scope.selectColor = (color) => {
                downDate = new Date();
                // localStorage.setItem('activeBackground', JSON.stringify(color));
                // updateBackground();
                $scope.currentBackground = color;
            };

            $scope.timeoutTest = () => {
                console.log('clear timeouts');
                $timeout.cancel(timeout);
            };

            $scope.selectColorDone = function(color, $event, $index) {
                $event.target.classList.add('is-active');
                // debugger;
                loopThroughColors($index, true);
                if (new Date() - downDate > 1000) {
                    localStorage.setItem('activeBackground', JSON.stringify(color));
                    updateBackground();
                } else {
                    // $event.target.classList.remove('is-active');
                }
            };



            // timeout = ()(i);

            function loopThroughColors(indexClicked, updated) {
                let i = indexClicked || 0;
                for (i; i < $scope.colors.length; i++) {

                    (function(ind) {

                        // console.log('in IIFE');
                        $timeout(function() {
                            if (updated) {
                                console.log('updated', ind, indexClicked);
                                ind = indexClicked;
                                updated = false;
                                // return;
                            }
                            console.log(ind, 'about to set');
                            $scope.currentBackground = $scope.colors[ind];
                            // console.log(ind, 'background set');

                            if (ind === $scope.colors.length - 1) {
                                // console.log('reached end');
                            }

                        }, ind * 1000);
                    })(i);

                    // setCurrentBackground(i);
                }
            }


            function setCurrentBackground(i) {
                console.log('setting background');

            }

            function updateBackground() {
                $scope.activeBackground = JSON.parse(localStorage.getItem('activeBackground')) || $scope.colors[0];
            }


            $scope.test = 'This is a test. If you are seeing this, it means that you have set angular up correctly :)';
        }
})(window.angular);
