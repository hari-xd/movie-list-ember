'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'ecom',
    environment,
    rootURL: '/',
    locationType: 'history',

    'vertical-collection': {
      defaultEstimateHeight: 50,
      defaultBufferSize: 10,
      defaultDynamicHeight: false,
    },
    'flashMessageDefaults': {
      // flash message defaults
      timeout: 200000,
      extendedTimeout: 0,
      priority: 200,
      sticky: false,
      showProgress: true,

      // service defaults
      type: 'info',
      types: ['success', 'info', 'warning', 'danger'],
      preventDuplicates: false,
    },

    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['vertical-collection'] = {
      ...ENV['vertical-collection'],
      debugRendering: false, // Set to true to see render boundaries
      logRendering: false,
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV['vertical-collection'] = {
      ...ENV['vertical-collection'],
      defaultBufferSize: 15,
      defaultEstimateHeight: 50,
    };
  }

  return ENV;
};
