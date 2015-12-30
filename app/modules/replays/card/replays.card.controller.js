import _ from 'lodash';

class ReplaysCardController {
  constructor($scope, $routeParams, $location, ReplaysService) {
    let replayId = $routeParams.replayId || -1;

    this.$scope = $scope;
    this.ReplaysService = ReplaysService;

    ReplaysService.getById(replayId).then(data => {
      this.$scope.replay = data;
    });
  }

  copyToClipboard(text, $event) {
    $event.stopPropagation();
    window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
  }
}

ReplaysCardController.$inject = ['$scope', '$routeParams', '$location', 'ReplaysService'];
export default ReplaysCardController;
