import EmberRouter from '@ember/routing/router';
import config from 'ecom/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('movie-list');
  this.route('addm');
  this.route('delm');
  this.route('editMovie');
  this.route('fetch-movies');
});
