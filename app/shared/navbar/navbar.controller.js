class NavbarController {
  constructor($scope) {
    $scope.testVar = 'We are up and running from a required module!';
  }
}

NavbarController.$inject = ['$scope'];
export default NavbarController;
