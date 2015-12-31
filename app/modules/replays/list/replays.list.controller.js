import _ from 'lodash';
import config from 'config';

let defaultPageSize = config.replays.defaultPageSize;

class ReplaysListController {
  constructor($scope, $routeParams, $location, ReplaysService) {
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.ReplaysService = ReplaysService;

    this.currentPage = $routeParams.page || 1;
    console.log(this.currentPage);
    this.totalPages = 0;
    this.searchStr = $routeParams.search;

    this._loadReplays(this.searchStr);

    $scope.$watch('vm.searchStr', (newVal, oldVal) => {
      if (newVal != oldVal) {
        this.search(newVal);
      }
    });
  }

  browsePage(pageNum) {
    this.$location.path('/replays').search('page', pageNum).search('search', null);
  }

  browseReplay(replayId) {
    this.$location.path('/replays/' + replayId).search('page', null).search('search', null);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  search(text) {
    this.$location.search('search', text).search('page', null);
    this.currentPage = 1;

    this._loadReplays(text);
  }

  getDownloadUrl(replayId) {
    return this.ReplaysService.getDownloadUrl(replayId);
  }

  _loadReplays(searchText) {

    this.ReplaysService.getCount(searchText).then(resp => {
      this.totalCount = resp.data;

      this.totalPages = Math.floor(this.totalCount / defaultPageSize) + 1;

      var list = [];
      for (var i = 1; i <= this.totalPages; i++) {
        list.push(i);
      }

      this.pages = list;

      let startIndex = (this.currentPage - 1) * defaultPageSize;

      if (this.totalCount < startIndex) {
        //$location.path('/replays');
        return;
      }

      this.ReplaysService.getLatest(startIndex, defaultPageSize, searchText).then(resp => {
        this.replays = resp;
      });
    }, err => { alert(err.msg);});
  }
}

ReplaysListController.$inject = ['$scope', '$routeParams', '$location', 'ReplaysService'];
export default ReplaysListController;
