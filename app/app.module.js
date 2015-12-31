import angluar from 'angular';
import ReplaysModule from './modules/replays/replays.module';
import Header from './shared/header/header.directive';
import Navbar from './shared/navbar/navbar.directive';
import Footer from './shared/footer/footer.directive';

var app = angular.module('ewg', [ReplaysModule]);

app.directive('ewgHeader', Header.directiveFactory);
app.directive('ewgNavbar', Navbar.directiveFactory);
app.directive('ewgFooter', Footer.directiveFactory);

export default app;
