function routingConfig($routeProvider) {
  $routeProvider
    .when('/replays', {
      templateUrl: './modules/replays/list/replays.list.view.html',
      controller: 'ReplaysListController',
      controllerAs: 'vm',
    })
    .when('/replays/:replayId', {
      templateUrl: './modules/replays/card/replays.card.view.html',
      controller: 'ReplaysCardController',
      controllerAs: 'vm',
    })
    .when('/upload', {
      templateUrl: './modules/replays/upload/replays.upload.view.html',
      controller: 'ReplaysUploadController',
      controllerAs: 'vm',
    })
    .otherwise({
      templateUrl: './modules/replays/list/replays.list.view.html',
      controller: 'ReplaysListController',
      controllerAs: 'vm',
    });
}

routingConfig.$inject = ['$routeProvider'];

export default routingConfig;
