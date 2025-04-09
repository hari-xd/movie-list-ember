import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

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

  @action
  updateGenre(event) {
    this.genre = event.target.value;
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

    const newMovie = {
      id: this.movie.movies.length + 1,
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
