import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { onKey } from 'ember-keyboard';

export default class DisplayMoviesComponent extends Component {
  @tracked title = '';
  @tracked displayedMovies = [];

  @service movie;

  batchSize = this.allMovies.length-1;

  constructor() {
    super(...arguments);
    this.loadInitialMovies();
  }

  get allMovies() {
    return this.movie.movies ?? [];
  }

  get filteredMovies() {
    if (!this.title.trim()) {
      return this.displayedMovies;
    }

    const searchTerm = this.title.trim().toLowerCase();
    return this.displayedMovies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(searchTerm) ||
        String(movie.year).includes(searchTerm) ||
        String(movie.genre).toLowerCase().includes(searchTerm) ||
        String(movie.imdb).includes(searchTerm) ||
        movie.box_office.toLowerCase().includes(searchTerm),
    );
  }

  loadInitialMovies() {
    this.displayedMovies = this.movie.movies.slice(0, this.batchSize);
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  firstReachedCallback(movie, index) {
    const firstIndex = this.movie.movies.findIndex((m) => m.id === movie.id);
    if (firstIndex > 0) {
      const start = Math.max(0, firstIndex - this.batchSize);
      const newItems = this.movie.movies.slice(start, firstIndex);

      this.displayedMovies = [...newItems, ...this.displayedMovies];
      console.log(this.displayedMovies.length);
    } else {
      // Loop to end of the list if at the top
      const total = this.movie.movies.length;
      const loopedStart = Math.max(0, total - this.batchSize);
      const looped = this.movie.movies.slice(loopedStart, total);
      this.displayedMovies = [...looped, ...this.displayedMovies];
      console.log(this.displayedMovies.length);

    }
  }

  @action
lastReachedCallback(movie, index) {
  console.log('Last visible movie:', movie, 'at index:', index);

  const lastIndex = this.movie.movies.findIndex((m) => m.id === movie.id);
  const total = this.movie.movies.length;

  let end = lastIndex + 1 + this.batchSize;

  if (end <= total) {
    // const newItems = this.movie.movies.slice(lastIndex + 1, end);
    // this.displayedMovies = [...this.displayedMovies, ...newItems];
  } else {
    // Loop back to start
    const remaining = this.movie.movies.slice(lastIndex + 1, total);
    const looped = this.movie.movies.slice(0, end - total);
    this.displayedMovies = [...this.displayedMovies, ...remaining, ...looped];
  }
}

@service router;
keyboardActivated = true;

@onKey('ctrl+a')
addShortcut = (event) => {
  event.preventDefault();
  this.router.transitionTo('addm');
};
@onKey('ctrl+d')
deleteShortcut = (e) => {
  e.preventDefault();
  this.router.transitionTo('delm');
};

@onKey('ctrl+e')
editShortcut = (e) => {
  e.preventDefault();
  this.router.transitionTo('editMovie');
};

@onKey('ctrl+f')
fetchShortcut = (e) => {
  e.preventDefault();
  this.router.transitionTo('fetch-movies');
};
}
