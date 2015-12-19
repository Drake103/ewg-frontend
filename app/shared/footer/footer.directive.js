import FooterController from './footer.controller';

class Footer {
  constructor() {
    this.restrict = 'E';
    this.templateUrl = '/shared/footer/footer.view.html';
    this.controller = FooterController;
  }

  static directiveFactory() {
    Footer.instance = new Footer();
    return Footer.instance;
  }
}

Footer.directiveFactory.$inject = [];

export default Footer;
