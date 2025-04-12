import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FetchMoviesRoute extends Route {
  @service movie;
  
    async model() {
      // Only fetch and set if movies are not already loaded
      if (this.movie.movies.length === 0) {
        const response = await fetch('/assets/data/data.json');
        const data = await response.json();
        this.movie.setMovies(data); // ✅ Store in service
      }
  
      return this.movie.movies; // ✅ Always return from service
    }
}
