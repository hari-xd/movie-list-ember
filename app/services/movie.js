import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MovieService extends Service {
  @tracked movies = [];

  constructor() {
    super(...arguments);
    this.loadInitialMovies();
  }

  async loadInitialMovies() {
    try {
      const saved = localStorage.getItem('movies');
      if (saved) {
        this.movies = JSON.parse(saved);
      } else {
        const response = await fetch('/assets/data/data.json');
        const movies = await response.json();
        this.movies = movies;
        localStorage.setItem('movies', JSON.stringify(movies));
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
    }
  }

  saveMovies() {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }
  setMovies(data) {
    this.movies = data;
  }

  addMovie(movie) {
    this.movies = [...this.movies, movie];
    this.saveMovies();
  }

  deleteMovies(ids) {
    this.movies = this.movies.filter((movie) => !ids.includes(movie.id));
    this.saveMovies();
  }

  deleteMoviesByIds(ids) {
    this.movies = this.movies.filter((movie) => !ids.includes(movie.id));
    this.saveMovies();
  }

  setMovies(movieList) {
    this.movies = movieList;
    this.saveMovies();
  }

  getMovies() {
    return this.movies;
  }

  resetMovies() {
    localStorage.removeItem('movies');
    this.loadInitialMovies();
  }
}
