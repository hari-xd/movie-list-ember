import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { onKey } from 'ember-keyboard';

export default class DisplayMoviesComponent extends Component {
  @service movie;
  @service router;

  @tracked caretDirection = 'down';
  @tracked title = '';
  @tracked searchHeadings = [];
  @tracked displayedMovies = [];
  @tracked searchTerm = false;
  @tracked selectedFields = ['Name', 'Year', 'Genre', 'IMDb', 'Box_Office'];
  @tracked keyboardActivated = true;

  batchSize = 10; // temporary default

  constructor() {
    super(...arguments);
    if (this.movie.movies && this.movie.movies.length > 0) {
      this.batchSize = this.movie.movies.length - 1;
      this.loadInitialMovies();
    }
  }
  @action
  closeSearchTerms() {
    this.searchTerm = false;
  }

  @action
  nameClicked() {
    if (this.caretDirection === '' || this.caretDirection === 'down') {
      this.caretDirection = 'up';
    } else {
      this.caretDirection = 'down';
    }
  }

  get allMovies() {
    return this.movie.movies ?? [];
  }

  get filteredMovies() {
    if (!this.title.trim()) {
      return this.displayedMovies;
    }

    const searchTerm = this.title.trim().toLowerCase();

    return this.displayedMovies.filter((movie) =>
      this.selectedFields.some((field) => {
        switch (field) {
          case 'Name':
            return movie.name?.toLowerCase().includes(searchTerm);
          case 'Year':
            return String(movie.year).includes(searchTerm);
          case 'Genre':
            return movie.genre?.toLowerCase().includes(searchTerm);
          case 'IMDb':
            return String(movie.imdb).includes(searchTerm);
          case 'Box_Office':
            return movie.box_office.toString().includes(searchTerm);
          default:
            return false;
        }
      }),
    );
  }

  loadInitialMovies() {
    if (this.movie.movies) {
      this.displayedMovies = this.movie.movies.slice(0, this.batchSize);
    }
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  toggleSearchTerm() {
    this.searchTerm = true;
    console.log('Search term active:', this.searchTerm);
  }

  @action
  toggleField(event) {
    const field = event.target.value;
    if (event.target.checked) {
      this.selectedFields = [...this.selectedFields, field];
    } else {
      this.selectedFields = this.selectedFields.filter((f) => f !== field);
    }
  }

  @action
  firstReachedCallback(movie, index) {
    const firstIndex = this.movie.movies.findIndex((m) => m.id === movie.id);
    if (firstIndex > 0) {
      const start = Math.max(0, firstIndex - this.batchSize);
      const newItems = this.movie.movies.slice(start, firstIndex);
      this.displayedMovies = [...newItems, ...this.displayedMovies];
    } else {
      const total = this.movie.movies.length;
      const loopedStart = Math.max(0, total - this.batchSize);
      const looped = this.movie.movies.slice(loopedStart, total);
      this.displayedMovies = [...looped, ...this.displayedMovies];
    }
  }

  @action
  lastReachedCallback(movie, index) {
    const lastIndex = this.movie.movies.findIndex((m) => m.id === movie.id);
    const total = this.movie.movies.length;
    let end = lastIndex + 1 + this.batchSize;

    if (end <= total) {
      const newItems = this.movie.movies.slice(lastIndex + 1, end);
      this.displayedMovies = [...this.displayedMovies, ...newItems];
    } else {
      const remaining = this.movie.movies.slice(lastIndex + 1, total);
      const looped = this.movie.movies.slice(0, end - total);
      this.displayedMovies = [...this.displayedMovies, ...remaining, ...looped];
    }
  }

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
