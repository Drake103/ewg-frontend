import angular from 'angular';
import 'angular-route';
import 'angular-resource';

import ReplaysService from './replays.service';
import ReplaysListController from './list/replays.list.controller';
import ReplaysCardController from './card/replays.card.controller';
import ReplaysUploadController from './upload/replays.upload.controller';

import routingConfig from './replays.config.routing';
import httpProviderConfig from './replays.config.http_provider';

let moduleName = 'ReplaysModule';

let ngModule = angular.module(moduleName, ['ngRoute', 'ngResource']);

ngModule.factory('ReplaysService', ReplaysService.createInstance);
ngModule.controller('ReplaysListController', ReplaysListController);
ngModule.controller('ReplaysCardController', ReplaysCardController);
ngModule.controller('ReplaysUploadController', ReplaysUploadController);

ngModule.config(routingConfig);
ngModule.config(httpProviderConfig);

export default moduleName;
