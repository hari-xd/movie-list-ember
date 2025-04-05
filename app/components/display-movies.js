import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DisplayMoviesComponent extends Component {
  @tracked title = '';
  @tracked filteredMovies = this.args.movies;

  @action
  updateTitle(event) {
    this.title = event.target.value.toLowerCase();
    this.filterMovies();
  }

  filterMovies() {
    if (!this.title) {
      this.filteredMovies = this.args.movies;
    } else {
      const searchTerm = this.title.toLowerCase();
      this.filteredMovies = this.args.movies.filter((movie) => {
        return (
          movie.name.toLowerCase().includes(searchTerm) ||
          String(movie.year).toLowerCase().includes(searchTerm) ||
          movie.genre.toLowerCase().includes(searchTerm) ||
          String(movie.imdb).toLowerCase().includes(searchTerm) ||
          movie.box_office.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
}
