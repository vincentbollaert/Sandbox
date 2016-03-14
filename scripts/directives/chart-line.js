(function(angular, d3) {
    'use strict';

    angular
        .module('webapp.directives')
        .directive('chartLine', directive);

        function directive() {
            return {
                restrict: 'E',
                scope: {
                    chartData: '=',
                    chartCompareData: '=',
                    chartColors: '='
                },
                replace: true,
                templateUrl: 'views/components/chart-line.html',
                link: link
            };

            function link(scope, element) {
                // angular.extend(scope, {
                //     showColorPicker: false
                // });

                // console.log(element);

                let graphContainer = d3.select('.slider-detail__chart');
                let margin = {top: 50, right: 50, bottom: 50, left: 50},
                    xAxisHeight = 20,
                    yAxisWidth = 20,
                    width = graphContainer.node().clientWidth - (margin.right + margin.left),
                    height = 300 - (margin.top + margin.bottom);


                let svg, x, y, line, area, xAxis, yAxis, horizontalLineGroup;
                let yCompare;
                let data, dataCompare, labels;

                let max;
                let compareMax;
                let maxArr = [];


                scope.$watch('chartData', init);
                scope.$watch('chartCompareData', init);

                function init() {
                    if (!scope.chartData) {
                        return;
                    }

                    maxArr = [];


                    data = (scope.chartData ? scope.chartData.map(d => +d) : []);
                    dataCompare = (scope.chartCompareData ? scope.chartCompareData.map(d => +d) : []);
                    // console.log(dataCompare);

                max = d3.max(data);
                compareMax = d3.max(dataCompare);

                maxArr.push(max, compareMax);

                // console.log(maxArr);

                    labels = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
                    // console.log(data, 'draw graph now');


                    // x scale will fit all values from data[] within pixels 0-width
                    // rangeBand required for ordinal
                    x = d3.scale.ordinal().rangeBands([0, width], 0, -0.5).domain(labels);
                    // y scale will fit values from 0-10 within pixels height-0 (Note the inverted domain for the y-scale: bigger is up!)
                    y = d3.scale.linear()
                        .range([height, 0])
                        .domain([0, d3.max(maxArr)])
                        .nice();

                    // create a line function that converts data[] into x and y points
                    line = d3.svg.line()
                        // assign the X and Y functions to plot our line
                        // console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
                        // console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + ' using our yScale.');
                        // return the X and Y coordinate where we want to plot this datapoint
                        .x((d, i) => x(labels[i]) + (x.rangeBand() / 2))
                        .y((d) => y(d));

                    area = d3.svg.area()
                        .x((d, i) => x(labels[i]) + (x.rangeBand() / 2))
                        .y0(height)
                        .y1(d => y(d));

                    // create xAxis
                    xAxis = d3.svg.axis()
                        .scale(x)
                        .tickFormat((d, i) => labels[i]);

                    // create yAxis
                    yAxis = d3.svg.axis()
                        .scale(y)
                        .ticks(4)
                        .orient('left');

                    render(data, dataCompare);

                    d3.select(window).on('resize', resize);

                    function resize() {
                        width = graphContainer.node().clientWidth - (margin.right + margin.left);
                        height = 400 - (margin.top + margin.bottom);

                        x.rangeBands([0, width], 0, -0.5);
                        y.range([height, 0]);

                        if (data) {
                            render(data, dataCompare);
                        }
                    }
                }




            function render(data, dataCompare) {
                graphContainer.selectAll('*').remove();

                svg = graphContainer.append('svg').attr({
                    width: width + margin.right + margin.left,
                    height: height + margin.top + margin.bottom
                })
                .append('g')
                    .attr({
                        transform: `translate( ${ margin.left + yAxisWidth / 2 }, ${ margin.top - xAxisHeight / 2 } )`
                    });

                horizontalLineGroup = svg.append('g')
                    .selectAll('line.grid-line').data(y.ticks(4)).enter()
                        .append('line')
                        .attr({
                            class: 'grid-line',
                            x1: 0,
                            x2: width,
                            y1: d => y(d),
                            y2: d => y(d)
                        });

                // Add xAxis
                svg.append('g')
                    .attr({
                        class: 'x axis',
                        transform: `translate(0, ${height})`
                        // transform: `translate(${x.rangeBand() / 2}, 0)`
                    })
                    .call(xAxis);

                // Add yAxis
                svg.append('g')
                    .attr({
                        class: 'y axis'
                    })
                    .call(yAxis);

                // Add path with data
                if (dataCompare.length) {
                    // console.log(dataCompare);
                    svg.append('path')
                        .attr({
                            d: line(dataCompare),
                            class: 'path-line'
                        });
                    svg.append('path')
                        .attr({
                            d: area(dataCompare),
                            class: 'path-area',
                            fill: scope.chartColors[1]
                        });
                }

                svg.append('path')
                    .attr({
                        d: line(data),
                        class: 'path-line'
                    });

                svg.append('path')
                    .attr({
                        d: area(data),
                        class: 'path-area',
                        fill: scope.chartColors[0]
                    });
            }



            }
        }
})(window.angular, window.d3);
