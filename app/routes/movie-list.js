import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MovieListRoute extends Route {
  @service movie;

  async model() {
    // Load columns from static JSON
    const columnsResponse = await fetch('/assets/data/table-head.json');
    let allColumns = await columnsResponse.json();

  
    if (this.movie.movies.length === 0) {
      const response = await fetch('/assets/data/data.json');
      const data = await response.json();
      this.movie.setMovies(data);
    }
    console.log(this.movie.movies);
    console.log(allColumns);
    return {
      movies: this.movie.movies,
      allColumns
    };
  }
}
