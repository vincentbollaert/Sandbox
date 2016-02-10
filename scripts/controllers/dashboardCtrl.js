(function(angular) {
    'use strict';

    angular.module('webapp.controllers')
        .controller('dashboardCtrl', ['$scope', 'dataService',
            function($scope, dataService) {
                dataService().get().then(function(receivedData) {
                    console.log(receivedData);

                    $scope.peopleDoc = receivedData;
                    console.log($scope.peopleDoc);

                    $scope.people = $scope.peopleDoc.map(function(x) {
                        return x.name;
                    });

                    $scope.averageBalance = $scope.peopleDoc.map(function(x) {
                        return x.balance;
                    });
                }, function() {
                      alert('fail');
                });

                $scope.selectPerson = (person) => {
                    $scope.selectedPerson = person;
                };

                $scope.colors = [
                    { name: 'red' },
                    { name: 'blue' },
                    { name: 'green' },
                    { name: 'yellow' },
                    { name: 'purple' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' },
                    { name: 'gray' }
                ];

                $scope.selectColor = (color) => {
                    $scope.selectedColor = color;
                };

                $scope.test = 'This is a test. If you are seeing this, it means that you have set angular up correctly :)';
            }
        ]);
})(window.angular);
