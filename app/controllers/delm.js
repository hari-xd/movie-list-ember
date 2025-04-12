import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DelmController extends Controller {
  @service movie;
  @service router;
  @service flashMessages;

  @tracked selectedIds = new Set(); // Store selected movie IDs

  get movies() {
    return this.movie.movies;
  }

  // Toggle selection of a movie
  @action
  toggleSelection(id, event) {
    if (event.target.checked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  // Delete selected movies
  @action
  deleteSelected(event) {
    event.preventDefault();
    this.movie.deleteMoviesByIds([...this.selectedIds]);
    this.selectedIds.clear();
    this.flashMessages.danger('Movie deleted successfully');
    this.router.transitionTo('movie-list');
  }

  @action
  handleDeletKey(event) {
    if (event.key === 'Enter') {
      this.saveMovie(event);
      this.deleteSelected(event);
    }
  }
}
