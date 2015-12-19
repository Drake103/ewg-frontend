import _ from 'lodash';

class ReplaysListController {
  constructor($scope, ReplaysService) {
    this.$scope = $scope;

    let replays = ReplaysService.getLatest(0, 30);
    replays.then(resp => {
      this.replays = resp;
    });
  }
}

ReplaysListController.$inject = ['$scope', 'ReplaysService'];
export default ReplaysListController;
