// movie.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MovieService extends Service {
  @tracked movies = [];

  addMovie(movie) {
    this.movies = [...this.movies, movie];
  }

  deleteMovies(ids) {
    this.movies = this.movies.filter((movie) => !ids.includes(movie.id));
  }
  deleteMoviesByIds(ids) {
    this.movies = this.movies.filter((movie) => !ids.includes(movie.id));
  }

  setMovies(movieList) {
    this.movies = movieList;
  }

  getMovies() {
    return this.movies;
  }
}
