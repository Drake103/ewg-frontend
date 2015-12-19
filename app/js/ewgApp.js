'use strict';

var wcfDateRegex = /^(\/Date\(\d*\)\/)$/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(wcfDateRegex))) {
            input[key] = parseInt(match[0].substring(6));
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
    return input;
}


define(['services/routeResolver'], function () {

    var app = angular.module('ewgApp', ['ngRoute', 'routeResolverServices', 'angularFileUpload', 'ui.bootstrap', 'dialogs.main']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$httpProvider' ,'dialogsProvider',

        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $httpProvider, dialogsProvider) {

            //Change default views and controllers directory using the following:
            routeResolverProvider.routeConfig.setBaseDirectories('/app/views/', '/app/js/controllers/');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
                //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
                //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
                //The controllers for orders live in controllers/orders and the views are in views/orders
                //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
                //Thanks to Ton Yeung for the idea and contribution
                .when('/replays', route.resolve('ReplaysList', 'replays/', 'vm', false, false))
                .when('/replays/upload', route.resolve('UploadReplay', 'replays/', 'vm'))
                .when('/replays/setTitle', route.resolve('SetReplayTitle', 'replays/', 'vm'))
                .when('/login', route.resolve('Login', 'security/', 'vm'))
                .otherwise({ redirectTo: '/replays' });

            $httpProvider.defaults.transformResponse.push(function(responseData) {
                convertDateStringsToDates(responseData);
                return responseData;
            });

            dialogsProvider.useBackdrop(true);
            dialogsProvider.useEscClose(true);
            dialogsProvider.useCopy(false);
            //dialogsProvider.setSize('sm');

        }]);

    app.filter('cut', function() {
        return function(value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

    app.run(['$rootScope', '$location', '$route', 'authService',
        function ($rootScope, $location, $route, authService) {

            //Client-side security. Server-side framework MUST add it's 
            //own security as well since client-based security is easily hacked
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (next && next.$$route && next.$$route.secure) {
                    if (!authService.user.isAuthenticated) {
                        $rootScope.$evalAsync(function () {
                            authService.redirectToLogin();
                        });
                    }
                }
            });

        }]);

    return app;

});





