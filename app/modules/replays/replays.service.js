import _ from 'lodash';
import config from 'config';

class ReplaysService {
  constructor($q, $resource, $http) {
    this.$q = $q;
    this.$resource = $resource;
    this.$http = $http;
  }

  _parseResponseDates(response) {
    let runs = response.data.runs;
    _.forEach(runs, r => r.timeStarted = new Date(r.timeStarted * 1000));

    return response;
  }

  getLatest(startIndex, pageSize, searchText = null) {
    let params = {startIndex, pageSize, searchText};
    let resource = this.$resource(this.apiRootOld + '/Replays/List', params, {
      get: {
        method:'GET',
        isArray: true,
      },
    });
    return resource.get().$promise;
  }

  getCount(searchText = null) {
    let params = {
      searchText,
    };

    return this.$http.get(this.apiRootOld + '/Replays/GetCount', params);
  }

  getById(replayId) {
    let params = {
      replayId,
    };

    let resource = this.$resource(this.apiRootOld + '/Replays/Details', params, {
      get: {
        method:'GET',
      },
    });
    return resource.get().$promise;
  }

  setTitle(replayId, token, title) {
    let requestObj = {
      replayId: replayId,
      token: token,
      newTitle: title,
    };

    return this.$http.post(this.apiRootOld + '/Replays/SetTitle', requestObj);
  }

  getUploadUrl() {
    return this.apiRootOld + '/Replays/Upload';
  }

  getDownloadUrl(replayId) {
    return this.apiRootOld + '/Replays/GetReplayFile?replayId=' + replayId;
  }

  static createInstance($q, $resource, $http) {
    ReplaysService.instance = new ReplaysService($q, $resource, $http);
    return ReplaysService.instance;
  }
}

ReplaysService.prototype.apiRoot = config.apiRoot;
ReplaysService.prototype.apiRootOld = config.apiRootOld;
ReplaysService.createInstance.$inject = ['$q', '$resource', '$http'];

export default ReplaysService;
