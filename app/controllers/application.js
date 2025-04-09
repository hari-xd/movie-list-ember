// controllers/application.js (or relevant controller)
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service flashMessages;

  @action
  close(flash) {
    this.flashMessages.remove(flash);
  }
}
