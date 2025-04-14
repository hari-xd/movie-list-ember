import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default class FetchMoviesController extends Controller {
  @tracked moviesTraditional = [];
  @tracked moviesModern = [];

  // Action for Traditional Fetch (using async/await)
  @action
  async fetchMovies() {
    const response = await fetch('/assets/data/data.json');
    const data = await response.json();
    this.moviesTraditional = data;
  }

  // Ember Concurrency task for Modern Fetch (button 2)
  @task(function* () {
    yield timeout(1000);
    const response = yield fetch('/assets/data/data.json');
    const data = yield response.json();
    return data;
  }).enqueue()
  fetchMoviesModernTask;
  

  // Getters for top 5 movies, randomizing the order
  get topFiveTraditional() {
    return [...this.moviesTraditional].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  get topFiveModern() {
    return [...this.moviesModern].sort(() => Math.random() - 0.5).slice(0, 5);
  }
  get topFiveFromTask() {
    const data = this.fetchMoviesModernTask.lastSuccessful?.value ?? [];
    return [...data].sort(() => Math.random() - 0.5).slice(0, 5);
  }
  

  // Action to trigger the modern fetch task
  @action
  fetchMoviesModern() {
    this.fetchMoviesModernTask.perform();
  }
}
