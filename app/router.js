import EmberRouter from '@ember/routing/router';
import ENV from 'portfolio/config/environment';

export default class Router extends EmberRouter {
  location = ENV.locationType;
  rootURL = ENV.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('bio');
});
