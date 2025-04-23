import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditMovieController extends Controller {
  @service movie;
  @service router;
  @service flashMessages;

  @tracked selectedMovie = null;
  @tracked editedFields = {
    name: '',
    year: '',
    genre: '',
    imdb: '',
    box_office: '',
  };

  get movies() {
    return this.movie.movies;
  }

  // Select a movie to edit
  @action
  selectMovie(movie) {
    this.selectedMovie = movie;
    this.editedFields = {
      name: movie.name,
      year: movie.year,
      genre: movie.genre,
      imdb: movie.imdb,
      box_office: movie.box_office,
    };
  }
  @action
  closeModal() {
    this.set('selectedMovie', null);
  }
  
  // Update edited field
  @action
  updateField(field, event) {
    this.editedFields[field] = event.target.value;
  }

  // Save changes
  @action
  saveChanges(event) {
    event.preventDefault();
    if (this.selectedMovie) {
      Object.assign(this.selectedMovie, this.editedFields);
      this.selectedMovie = null;
      this.flashMessages.success('Movie edited successfully');
      this.router.transitionTo('movie-list');
    }
  }

  @action
  editMovie(movie) {
    this.selectedMovie = movie;
    this.editedFields = { ...movie };

    // Scroll to the form smoothly
    setTimeout(() => {
      const formEl = document.getElementById('edit-form-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50); // Slight delay to ensure DOM update
  }
}
