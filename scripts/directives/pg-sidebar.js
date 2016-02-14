(function(angular) {
    'use strict';

    angular.module('webapp.directives')
        .directive('pgSidebar', [
            () => {
                return {
                    restrict: 'E',
                    scope: {
                        // colors: '=',
                        // selectColor: '='
                    },
                    replace: true,
                    templateUrl: 'views/components/pg-sidebar.html',

                    link: (scope) => {
                        scope.sidebarItems = [{
                            item: 'home',
                            subItems: ['one', 'two', 'three']
                        },{
                            item: 'about',
                            subItems: ['one', 'two', 'three']
                        },{
                            item: 'contact',
                            subItems: ['one', 'two', 'three']
                        }];
                    }
                };
            }
        ]);
})(window.angular);
