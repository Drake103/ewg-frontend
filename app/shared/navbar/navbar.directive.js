import NavbarController from './navbar.controller';

class Navbar {
  constructor() {
    this.restrict = 'A';
    this.templateUrl = '/shared/navbar/navbar.view.html';
    this.controller = NavbarController;
  }

  static directiveFactory() {
    Navbar.instance = new Navbar();
    return Navbar.instance;
  }
}

Navbar.directiveFactory.$inject = [];

export default Navbar;
