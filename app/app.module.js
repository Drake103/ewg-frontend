import angluar from 'angular';
import ReplaysModule from './modules/replays/replays.module';
import Navbar from './shared/navbar/navbar.directive';
import Footer from './shared/footer/footer.directive';
import ngRoute from 'angular-route';

var app = angular.module('ewg', [ReplaysModule]);

app.directive('ewgNavbar', Navbar.directiveFactory);
app.directive('ewgFooter', Footer.directiveFactory);

export default app;
