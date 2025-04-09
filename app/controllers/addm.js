import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { tracked } from '@glimmer/tracking';

export default class AddmController extends Controller {
  @service movie;
  @service router;
  @service flashMessages;

  // Form fields
  name = '';
  year = '';
  genre = '';
  imdb = '';
  boxOffice = '';
  isSaving = false;

  // @action
  // updateGenre(event) {
  //   this.genre = event.target.value;
  // }

  @tracked selectedGenre = null;
  @tracked genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Thriller'];

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

    let currentIndex = parseInt(event.target.getAttribute('data-input-index'));
    let nextInput = document.querySelector(`[data-input-index="${currentIndex + 1}"]`);

    if (nextInput && nextInput.classList.contains('ember-power-select-trigger')) {
      nextInput.querySelector('input')?.focus();
    } else if (nextInput) {
      nextInput.focus();
    } else {
      // Submit the form if it's the last input
      console.log('last');
      this.saveMovie(event);
      
    }
  }
}




  @action
  async saveMovie(event) {
    event.preventDefault();
    if (this.isSaving) return;

    // Validation
    if (!this.name.trim() || !this.year || !this.genre || !this.imdb || !this.boxOffice) {
      this.flashMessages.warning('Please fill out all required fields!');
      return;
    }

    this.isSaving = true;

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
      await this.movie.addMovie(newMovie);
      this.flashMessages.success('Movie added successfully!');
      this.router.transitionTo('movie-list');
    } catch (error) {
      this.flashMessages.danger(`Error saving movie: ${error.message}`);
    } finally {
      this.isSaving = false;
    }
  }


}
