(function(angular) {
    'use strict';

    angular
        .module('webapp.controllers')
        .controller('dashboardCtrl', controller);

        function controller($scope, dataService, bgService) {
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

            if (!localStorage.getItem('population')) {
                dataService().get().then((data) => {
                    localStorage.setItem('population', JSON.stringify(data));
                    $scope.population = localStorage.getItem('population');
                }, function() {
                      alert('fail');
                });
            } else {
            }

            (function init() {
                updateBackground();
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

            $scope.selectColor = (color) => {
                localStorage.setItem('activeBackground', JSON.stringify(color));
                updateBackground();
            };

            function updateBackground() {
                $scope.activeBackground = JSON.parse(localStorage.getItem('activeBackground')) || $scope.colors[0];
            }


            $scope.test = 'This is a test. If you are seeing this, it means that you have set angular up correctly :)';
        }
})(window.angular);
