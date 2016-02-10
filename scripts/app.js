(function(angular) {
    'use strict';

    var module = angular
        .module('webapp', [
            'LocalStorageModule',
            'webapp.routes',
            'webapp.controllers',
            'webapp.directives',
            'webapp.filters',
            'webapp.services',
            'webapp.config'
        ]);
})(window.angular);
