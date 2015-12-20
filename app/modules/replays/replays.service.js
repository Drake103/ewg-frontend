import _ from 'lodash';
import config from 'config';

class ReplaysService {
  constructor($q, $resource) {
    this.$q = $q;
    this.$resource = $resource;
  }

  _parseResponseDates(response) {
    let runs = response.data.runs;
    _.forEach(runs, r => r.timeStarted = new Date(r.timeStarted * 1000));

    return response;
  }

  getLatest(startIndex, pageSize, searchText = null) {
    let params = {
      startIndex,
      pageSize,
      searchText,
    };
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
    let resource = this.$resource(this.apiRootOld + '/Replays/GetCount', params, {
      get: {
        method:'GET',
      },
    });
    return resource.get().$promise;
  }

  static createInstance($q, $resource) {
    ReplaysService.instance = new ReplaysService($q, $resource);
    return ReplaysService.instance;
  }
}

ReplaysService.prototype.apiRoot = config.apiRoot;
ReplaysService.prototype.apiRootOld = config.apiRootOld;
ReplaysService.createInstance.$inject = ['$q', '$resource'];

export default ReplaysService;
