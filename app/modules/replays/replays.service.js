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

  getLatest(startIndex, pageSize) {
    let params = {
      startIndex,
      pageSize,
    };
    let resource = this.$resource(this.apiRoot + '/Replays/List', params, {
      get: {
        method:'GET',
        isArray: true,
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
ReplaysService.createInstance.$inject = ['$q', '$resource'];

export default ReplaysService;
