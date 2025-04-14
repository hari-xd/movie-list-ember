// app/app.js
import Application from '@ember/application';
import Resolver from 'ember-resolver'; // <-- Ensure this line
import loadInitializers from 'ember-load-initializers';
import config from 'ecom/config/environment';
import 'ember-power-select/styles';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver; // <-- Must match exactly (capital "R")
}

loadInitializers(App, config.modulePrefix);
