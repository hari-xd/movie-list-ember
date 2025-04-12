import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class FetchMoviesController extends Controller {
  @tracked moviesTraditional = [];
  @tracked moviesModern = [];
  @tracked isLoading = false;

  @action
  async fetchMovies() {
    const response = await fetch('/assets/data/data.json');
    const data = await response.json();
    this.moviesTraditional = data;
  }

  @(task(function* () {
    this.isLoading = true;
  
    yield timeout(1000); // Wait 1 second
    const response = yield fetch('/assets/data/data.json');
    const data = yield response.json();
  
    this.moviesModern = data;
    this.isLoading = false;
  }).drop())
  fetchMoviesModernTask;
  

  get topFiveTraditional() {
    return [...this.moviesTraditional].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  get topFiveModern() {
    return [...this.moviesModern].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  @action
  fetchMoviesModern() {
    this.fetchMoviesModernTask.perform();
  }
}
