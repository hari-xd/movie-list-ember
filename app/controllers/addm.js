import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class AddmController extends Controller {
  // @tracked isInitialLoading = true;

  @service movie;
  @service router;
  @service flashMessages;

  // Form fields
  name = '';
  year = '';
  genre = '';
  imdb = '';
  boxOffice = '';

  @tracked selectedGenre = null;
  @tracked genres = [
    {
      groupName: 'Popular',
      options: ['Action', 'Comedy', 'Drama'],
    },
    {
      groupName: 'Niche',
      options: ['Sci-Fi', 'Horror', 'Thriller'],
    },
  ];

  @action
  updateGenre(genre) {
    this.selectedGenre = genre;
    this.genre = genre;
  }

  @action
  cancelForm() {
    this.name = '';
    this.year = '';
    this.genre = '';
    this.selectedGenre = null;
    this.imdb = '';
    this.boxOffice = '';
  }

  @action
  handleEnterKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      let currentIndex = parseInt(
        event.target.getAttribute('data-input-index'),
      );
      let nextInput = document.querySelector(
        `[data-input-index="${currentIndex + 1}"]`,
      );

      if (
        nextInput &&
        nextInput.classList.contains('ember-power-select-trigger')
      ) {
        nextInput.querySelector('input')?.focus();
      } else if (nextInput) {
        nextInput.focus();
      } else {
        console.log('last');
      }
    }
  }

  @action
  handleEnterKeylast(event) {
    if (event.key === 'Enter') {
      this.addMovieTask.perform(event);
    }
  }

  @(task(function* (event) {
    if (event) event.preventDefault();

    if (
      !this.name.trim() ||
      !this.year ||
      !this.genre ||
      !this.imdb ||
      !this.boxOffice
    ) {
      this.flashMessages.warning('Please fill out all required fields!');
      return;
    }

    let movies = this.movie.movies;
    let lastId = movies.length > 0 ? movies[movies.length - 1].id : 0;

    const newMovie = {
      id: lastId + 1,
      name: this.name.trim(),
      year: this.year,
      genre: this.genre,
      imdb: this.imdb,
      box_office: this.boxOffice,
    };

    try {
      yield this.movie.addMovie(newMovie);
      this.flashMessages.success('Movie added successfully!');
      this.router.transitionTo('movie-list');
    } catch (error) {
      this.flashMessages.danger(`Error saving movie: ${error.message}`);
    }
  }).drop())
  addMovieTask;
}
