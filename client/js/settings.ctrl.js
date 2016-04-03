angular.module('settingsController', [])

.controller('settingsCtrl', function($location) {
    var settings = this;

    settings.changeView = function(view){
        $location.path(view);
    };

})
