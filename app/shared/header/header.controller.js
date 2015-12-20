class HeaderController {
  constructor($scope) {
    $scope.testVar = 'We are up and running from a required module!';
  }
}

HeaderController.$inject = ['$scope'];
export default HeaderController;
