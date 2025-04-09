import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DisplayMoviesComponent extends Component {
  @tracked title = '';

  @service movie; // Access shared movie data from service

  get allMovies() {
    // Prefer service.movies if it has data, otherwise fallback to args.movies
    return this.movie.movies.length > 0
      ? this.movie.movies
      : (this.args.movies ?? []);
  }

  get filteredMovies() {
    if (!this.title.trim()) {
      return this.allMovies;
    }

    const searchTerm = this.title.toLowerCase();
    return this.allMovies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(searchTerm) ||
        String(movie.year).includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm) ||
        String(movie.imdb).includes(searchTerm) ||
        movie.box_office.toLowerCase().includes(searchTerm),
    );
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  handleAction(movie, event) {
    let action = event.target.value;
    if (action === 'edit') {
      // Handle edit logic
    } else if (action === 'delete') {
      // this.deleteMovie(movie);
      console.log('moive');
    }
  }
}
