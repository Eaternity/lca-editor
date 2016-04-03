// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])
    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        // route for the table page
            .when('/', {
                templateUrl: 'views/pages/table.html',
                controller: 'tableCtrl',
                controllerAs: 'table'
            })
            // route for the settings page
            .when('/settings', {
                templateUrl: 'views/pages/settings.html',
                controller: 'settingsCtrl',
                controllerAs: 'settings'
            })
            // route for the edit page
            // //pagetoeditauser
            .when('/edit/:product_id', {
                templateUrl: 'views/pages/edit.html',
                controller: 'editCtrl',
                controllerAs: 'edit'
            });
        // set our app up to have pretty URLS
        $locationProvider.html5Mode(true);
    });
