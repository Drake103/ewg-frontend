import _ from 'lodash';

let defaultPageSize = 20;

class ReplaysListController {
  constructor($scope, $routeParams, $location, ReplaysService) {
    let replayId = $routeParams.view || -1;
    let pageNumber = $routeParams.page || 1;
    let search = $routeParams.search;

    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.ReplaysService = ReplaysService;

    this.currentPage = pageNumber;
    this.searchStr = search;

    this._loadReplays(this.searchStr);

    $scope.$watch('vm.searchStr', (newVal, oldVal) => {
      if (newVal != oldVal) {
        this.search(newVal);
      }
    });

    if (replayId > 0) {
      this.browseReplay(replayId);
    }
  }

  browsePage(aPageNumber) {
    $location.search('page', aPageNumber).search('view', null).search('search', null);
    this.currentPage = aPageNumber;
    this.loadReplays(null);
  }

  browseReplay(aReplayId) {
    this.$location.search('page', null).search('view', aReplayId).search('search', null);
    var dlg = dialogs.create('/app/views/replays/replayCardModal.html', 'ReplayCardController', aReplayId);
    dlg.result.then(function() {
      $location.search('page', this.currentPage).search('search', this.searchStr).search('view', null);
      replayId = -1;
    }, function() {

      $location.search('page', this.currentPage).search('search', this.searchStr).search('view', null);
      replayId = -1;
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  search(text) {
    this.$location.search('search', text).search('page', null);
    this.currentPage = 1;

    this._loadReplays(text);
  }

  _loadReplays(searchText) {

    this.ReplaysService.getCount(searchText).then(data => {
      this.totalCount = data;

      this.totalPages = Math.floor(data / defaultPageSize) + 1;

      var list = [];
      for (var i = 1; i <= this.totalPages; i++) {
        list.push(i);
      }

      this.pages = list;

      var startIndex = (this.currentPage - 1) * defaultPageSize;

      if (this.totalCount < startIndex) {
        //$location.path('/replays');
        return;
      }

      this.ReplaysService.getLatest(startIndex, defaultPageSize, searchText).then(resp => {
        this.replays = resp;
      });
    }, err => { alert(err);});
  }
}

ReplaysListController.$inject = ['$scope', '$routeParams', '$location', 'ReplaysService'];
export default ReplaysListController;
