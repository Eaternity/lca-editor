angular.module('editController', [])

.controller('editCtrl', function($location, $productService, $dataChannel, $routeParams) {
    var edit = this;

    // Use $routeParams to extract the _id from the Url
    edit.product_id = $routeParams.product_id;
    console.log(edit.product_id);

    // User.get($routeParams.user_id)
    //     .success(function(data) { vm.userData = data;
    //     });

    // get the user data for the user you want to edit;
    $productService.get(edit.product_id)
        .success(function(data) {
            edit.product = data;
        });

    // Save the updated user data
    edit.saveChanges = function() {
        edit.processing = true;
        edit.message = '';
        // call the $productService to update
        $productService.update(edit.product_id, edit.product)
        .success(function(data) {
            edit.processing = false;
            // clear the form
            edit.product = {};
            // bind the message from our API to edit .message
            edit.message = data.message;
        });
    };

    edit.changeView = function(view) {
        $location.path(view);
    };

})
