angular.module('productService', [])

.factory('$productService', function($http) {

// create a new object
var productFactory = {};

// get a single product
productFactory.get = function(id) {
return $http.get('/api/products/' + id);
};

// get all products
productFactory.all = function() {
return $http.get('/api/products/');
};

// create a product
productFactory.create = function(productData) {
return $http.post('/api/products/', productData);
};

// update a product
productFactory.update = function(id, productData) {
return $http.put('/api/products/' + id, productData);
};

// delete a product
productFactory.delete = function(id) {
return $http.delete('/api/products/' + id);
};

// return our entire productFactory object
return productFactory;
});
