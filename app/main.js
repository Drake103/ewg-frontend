require.config({
  baseUrl: '/app/js',
  urlArgs: 'v=1.0',
});

require(
    [
        'ewgApp',
        'services/routeResolver',
        'services/config',
        'services/authService',
        'services/httpInterceptors',
        'services/angularModalService',
        'controllers/NavbarController',
        'controllers/replays/ReplayCardController',
    ],
    function() {
      angular.bootstrap(document, ['ewgApp']);
    });
