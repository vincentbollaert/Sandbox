(function(angular) {
    'use strict';

    var module = angular
        .module('webapp', [
            'webapp.routes',
            'webapp.controllers',
            'webapp.directives',
            'webapp.filters',
            'webapp.services',
            'webapp.config'
        ]);
})(window.angular);
