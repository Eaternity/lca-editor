'use strict';

/* App Module */

// Inject dependencies for ngMaterial and Controllers
angular.module('lcaEditor', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'ngMdIcons',
    'md.data.table',
    'tableController',
    'settingsController',
    'editController',
    'productService',
    'dataService',
    'routerRoutes'
])

.config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('default')
      .primaryPalette('yellow')
  });
