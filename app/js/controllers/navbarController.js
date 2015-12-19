'use strict';

define(['ewgApp'], function (ewgApp) {

    var injectParams = ['$rootScope', '$scope', '$location', '$http', '$routeParams', 'authService'];

    var controller = function ($rootScope, $scope, $location, $http, $routeParams, authService) {

        var vm = this;

        vm.isAuthenticated = false;

        vm.highlight = function (path) {
            return $location.path().substr(0, path.length) === path;
        };

        vm.login = function () {
            authService.login(vm.email, vm.password);
        };

        vm.logout = function () {
            authService.logout();
        };

        function redirectToLogin() {
            var path = '/session/new' + $location.$$path;
            $location.replace();
            $location.path(path);
        }

        $scope.$on('loginStatusChanged', function (eventArgs, loggedIn) {
            $rootScope.isAuthenticated = loggedIn;
        });

        $scope.$on('redirectToLogin', function () {
            redirectToLogin();
        });
    };

    controller.$inject = injectParams;

    ewgApp.controller('NavbarController', controller);
});