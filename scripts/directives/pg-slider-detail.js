(function(angular) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('pgSliderDetail', directive);

        function directive(optionsFactory) {
            let inputData = undefined;

            return {
                restrict: 'E',
                scope: {
                    selectedPerson: '='
                },
                replace: true,
                templateUrl: 'views/components/pg-slider-detail.html',
                link: link
            };

            function link(scope) {
                angular.extend(scope, {
                    options: optionsFactory,
                    sliderStates: {
                        docked: false,
                        fullScreen: false,
                        closed: false
                    },
                    rangeModel: 50,
                    setState: setState,
                    activeState: undefined,
                    isDocked: {},
                    chartColors: ['rgba(0, 170, 221, 0.59)', 'rgba(21, 178, 226, 0.81)'],
                    chartData: [],
                    inputData: {
                        labels: {
                            raw: '',
                            formatted: []
                        },
                        main: {
                            raw: '',
                            formatted: []
                        },
                        compare: {
                            raw: '',
                            formatted: []
                        }
                    },
                    generateRandomData: generateRandomData,
                    randomData: {
                        labels: [],
                        main: [],
                        compare: []
                    },
                    updateInputData: updateInputData
                });

                scope.$on('optionTransparentScrollbars', function() {
                    console.log('received transparent scrollbars');
                    // scope.optionsTransparentBackground =
                });

                function setState(selectedState) {
                    let keys = Object.keys(scope.sliderStates),
                        i = 0;

                    for (i; i < keys.length; i++) {
                        if (keys[i] !== selectedState) {
                            scope.sliderStates[keys[i]] = false;
                        }
                    }

                    scope.sliderStates[selectedState] = !scope.sliderStates[selectedState];
                    scope.activeState = (scope.sliderStates[selectedState] ? selectedState : undefined);

                    if (selectedState === 'closed') {
                        scope.selectedPerson = undefined;
                        scope.activeState = undefined;
                    }
                }

                function updateInputData(mainOrCompare) {
                    console.log(scope.inputData[mainOrCompare], typeof scope.inputData[mainOrCompare]);
                    scope.inputData[mainOrCompare].formatted = [];

                    let i = 0,
                        foundComma = (scope.inputData[mainOrCompare].raw.indexOf(',') > -1 ? true : false),
                        commaArray = [];

                    if (!scope.inputData[mainOrCompare].raw.length) {
                        return;
                    }

                    if (foundComma) {
                        commaArray = scope.inputData[mainOrCompare].raw.split(',');
                        for (i; i < commaArray.length; i++) {
                            pushData(commaArray[i]);
                        }
                        return;
                    }

                    pushData();
                    scope.inputData[mainOrCompare].raw = '';

                    function pushData(data) {
                        scope.inputData[mainOrCompare].formatted.push(data || scope.inputData[mainOrCompare].raw);
                        scope.inputData[mainOrCompare].final = scope.inputData[mainOrCompare].formatted;
                    }
                }

                function generateRandomData() {
                    let i = 0,
                        length = 10;

                    resetRandomData();

                    for (i; i < length; i++) {
                        scope.randomData.labels.push(randomInt().toString());
                        scope.randomData.main.push(randomInt());
                        scope.randomData.compare.push(randomInt());
                    }
                    scope.inputData.labels.raw = scope.randomData.labels;
                    scope.inputData.main.raw = scope.randomData.main;
                    scope.inputData.compare.raw = scope.randomData.compare;

                    console.log(scope.randomData);

                    function randomInt() {
                        return Math.floor(Math.random() * 100);
                    }

                    function resetRandomData() {
                        scope.randomData.labels = [];
                        scope.randomData.main = [];
                        scope.randomData.compare = [];
                    }
                }
            }
        }
})(window.angular);
