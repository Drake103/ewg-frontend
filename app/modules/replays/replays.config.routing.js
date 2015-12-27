function routingConfig($routeProvider) {
  $routeProvider
    .when('/replays', {
      templateUrl: './modules/replays/replays.list.view.html',
      controller: 'ReplaysListController',
    })
    .when('/replays/:replayId', {
      templateUrl: './modules/replays/card/replays.card.view.html',
      controller: 'ReplaysCardController',
    })
    .otherwise({
      templateUrl: './modules/replays/list/replays.list.view.html',
      controller: 'ReplaysListController',
    });
}

routingConfig.$inject = ['$routeProvider'];

export default routingConfig;
