import HeaderController from './header.controller';

class Header {
  constructor() {
    this.restrict = 'A';
    this.templateUrl = '/shared/header/header.view.html';
    this.controller = HeaderController;
  }

  static directiveFactory() {
    Header.instance = new Header();
    return Header.instance;
  }
}

Header.directiveFactory.$inject = [];

export default Header;
