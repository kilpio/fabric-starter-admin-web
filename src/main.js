import environment from './environment';
import {Backend, TCustomAttribute} from 'aurelia-i18n';
import {PLATFORM} from 'aurelia-pal';

// import {TCustomAttribute} from 'aurelia-i18n';
// import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {

  aurelia.use
    .standardConfiguration()
    .defaultResources()
    .plugin('aurelia-i18n', (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend.with(aurelia.loader));
      // instance.i18next.use(Backend);

      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: '../locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng: 'en',
        fallbackLng: 'en',
        debug: false
      });
    })
    .plugin('aurelia-table')
    .plugin('aurelia-validation')
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-plugins-tabs'))
    .plugin('aurelia-bootstrap')
    .feature('components')
    .feature('resources')
    .globalResources('components/orderer/orderers-block')
    .globalResources('components/orderer/orgs-block');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => {
    let isLoggedIn = localStorage.getItem('jwt');
    if (isLoggedIn) {
      aurelia.setRoot();
    }
    else {
      aurelia.setRoot('login');
    }
  });

}
