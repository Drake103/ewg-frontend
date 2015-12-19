'use strict';

define(['ewgApp'], function(ewgApp) {

    var injectParams = ['$rootScope', '$scope', '$location', '$http', '$routeParams', 'authService'];

    var controller = function($rootScope, $scope, $location, $http, $routeParams, authService) {

        var vm = this,
            path = '/';
        vm.email = null;
        vm.password = null;
        vm.errorMessage = null;

        vm.login = function () {

            authService.login(vm.email, vm.password).then(function(status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    vm.errorMessage = 'Unable to login';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            });
        };
    };

    controller.$inject = injectParams;

    ewgApp.controller('LoginController', controller);
});