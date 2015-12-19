class FooterController {
  constructor($scope) {
    $scope.testVar = 'We are up and running from a required module!';
  }
}

FooterController.$inject = ['$scope'];
export default FooterController;
