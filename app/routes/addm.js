// app/routes/addm.js
import Route from '@ember/routing/route';

export default class AddmRoute extends Route {
  async model() {
    const response = await fetch('/assets/data/data.json');
    const movies = await response.json();
    return movies;
  }
}
