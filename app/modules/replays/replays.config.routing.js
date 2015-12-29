function routingConfig($routeProvider) {
  $routeProvider
    .when('/replays', {
      templateUrl: './modules/replays/list/replays.list.view.html',
      controller: 'ReplaysListController',
    })
    .when('/replays/:replayId', {
      templateUrl: './modules/replays/card/replays.card.view.html',
      controller: 'ReplaysCardController',
    })
    .when('/upload', {
      templateUrl: './modules/replays/upload/replays.upload.view.html',
      controller: 'ReplaysUploadController',
    })
    .otherwise({
      templateUrl: './modules/replays/list/replays.list.view.html',
      controller: 'ReplaysListController',
    });
}

routingConfig.$inject = ['$routeProvider'];

export default routingConfig;
