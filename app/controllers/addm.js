import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddmController extends Controller {
  @tracked
  
  @action
  exampleAction() {
	console.log('Action executed');
  }
}
