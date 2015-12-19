'use strict';

define(['ewgApp'], function (ewgApp) {

    var injectParams = ['$http', '$rootScope'];

    var authFactory = function ($http, $rootScope) {
        var serviceBase = '/',
            factory = {
                loginPath: '/session/new',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        $http.get('/session/IsAuthenticated').success(function (data) {
            changeAuth(data.success);
            //callback && callback();
        }).error(function () {
            factory.user.isAuthenticated = false;
            //callback && callback();
        });

        factory.login = function (email, password) {
            return $http.post(serviceBase + 'session/create', { Email: email, Password: password }).then(
                function (results) {
                    var loggedIn = results.data.success;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.logout = function () {
            return $http.post(serviceBase + 'session/destroy').then(
                function (results) {
                    var loggedIn = !results.data.success;
                    changeAuth(loggedIn);
                    return loggedIn;
                });
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    ewgApp.factory('authService', authFactory);

});
