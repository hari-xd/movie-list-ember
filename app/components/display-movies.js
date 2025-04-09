import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DisplayMoviesComponent extends Component {
  @tracked title = '';

  @service movie;

  get allMovies() {
    return this.movie.movies ?? [];
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
        String(movie.genre).toLowerCase().includes(searchTerm) ||
        String(movie.imdb).includes(searchTerm) ||
        movie.box_office.toLowerCase().includes(searchTerm),
    );
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }
}
