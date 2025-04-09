import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DelmRoute extends Route {
  @service movie;

  model() {
    return this.movie.movies;
  }
}
