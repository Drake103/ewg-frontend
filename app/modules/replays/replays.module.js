import angular from 'angular';
import 'angular-route';
import 'angular-resource';

import ReplaysService from './replays.service';
import ReplaysListController from './replays.list.controller';

let moduleName = 'ReplaysModule';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('ReplaysService', ReplaysService.createInstance);
ngModule.controller('ReplaysListController', ReplaysListController);

ngModule.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/modules/replays/replays.list.view.html',
      controller: 'ReplaysListController',
    });
});

export default moduleName;
