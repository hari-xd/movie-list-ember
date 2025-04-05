import Route from '@ember/routing/route';

export default class MovieListRoute extends Route {
  async model() {
    const response = await fetch('/assets/data/data.json'); // Corrected path
    const data = await response.json();
    return data;
  }
}
