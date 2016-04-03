/* Controllers */

// Yes! The following is possible in an electron environment! Requiring stuff
// directly here would also work with Browserify I guess...
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// should I rather create a seperate renderer file for each view?
// eg. index.js for index.html and so on... Then module.export that renderer
// and require it here... Not sure... It's all baklava-spaghetti right now ;-)
//var index = require('../../electron/renderers/index.js');


angular.module('tableController', [])

.controller('tableCtrl', function($mdDialog, $q, $timeout, $location, $productService) {
    var table = this;

    table.status = '';

    table.selected = [];
    table.limitOptions = [5, 10, 15];
    table.query = {
        order: 'id',
        limit: 10,
        page: 1
    };

    $productService.all()
        .success(function(data) {
            table.products = data;
        });

    table.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
    };

    table.toggleLimitOptions = function() {
        table.limitOptions = table.limitOptions ? undefined : [5, 10, 15];
    };

    table.logItem = function(item) {
        console.log(item.name, 'was selected');
    };

    table.logOrder = function(order) {
        console.log('order: ', order);
    };

    table.logPagination = function(page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    };

    table.changeView = function(view){
        $location.path(view);
    };

})
