import angular from 'angular';
import 'angular-route';
import 'angular-resource';

import ReplaysService from './replays.service';
import ReplaysListController from './replays.list.controller';
import ReplaysCardController from './replays.card.controller';

let moduleName = 'ReplaysModule';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('ReplaysService', ReplaysService.createInstance);
ngModule.controller('ReplaysListController', ReplaysListController);
ngModule.controller('ReplaysCardController', ReplaysCardController);

ngModule.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/modules/replays/replays.list.view.html',
      controller: 'ReplaysListController',
    })
    .when('/replays/:replayId', {
      templateUrl: '/modules/replays/replays.card.view.html',
      controller: 'ReplaysCardController',
    });
});

export default moduleName;
