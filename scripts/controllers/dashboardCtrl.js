(function(angular) {
    'use strict';

    angular.module('webapp.controllers')
        .controller('dashboardCtrl', ['$scope', 'dataService',
            function($scope, dataService) {

                let perSlide = 5;

                dataService().get().then(function(receivedData) {

                    $scope.peopleDoc = receivedData;
                    $scope.peopleDocLength = $scope.peopleDoc.length;
                    $scope.slidesAmt = Math.ceil($scope.peopleDocLength / perSlide);

                    console.log($scope.peopleDocLength, $scope.peopleDoc);

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
                    { name: '#11C596' },
                    { name: '#39AAD9' },
                    { name: '#49AA49' },
                    { name: '#1CC8D3' },
                    { name: '#D3C81B' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' },
                    { name: '#e6e6e6' }
                ];

                $scope.selectColor = (color) => {
                    $scope.selectedColor = color;
                };

                $scope.test = 'This is a test. If you are seeing this, it means that you have set angular up correctly :)';
            }
        ]);
})(window.angular);
