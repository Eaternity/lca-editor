// export everytthing and make sure the same instances of app and express are
// used across routing files b ypassing them as parameters
var Product = require('../models/product');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // route exposing all products
    apiRouter.route('/products')

    .get(function(req, res) {
        Product.find(function(err, products) {
            //console.log(products);
            res.json(products);
        });
    });

    // route exposing a specific product defined by get params
    apiRouter.route('/products/:product_id')

    // get the product with that id
    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err) res.send(err);

            // return that product
            res.json(product);
        });
    })

    // update product with this id
    // (accessed at PUT http://localhost:8080/api/products/:product_id)
    .put(function(req, res) {
        // use Product model to find the user we want
        Product.findById(req.params.product_id, function(err, product) {
            if (err) res.send(err);

            // update the product only if its new
            // if (req.body.name) product.name = req.body.name;
            if (req.body.nameEnglish) product.nameEnglish = req.body.nameEnglish;
            if (req.body.co2Value) product.co2Value = req.body.co2Value;

            // save the product
            product.save(function(err) {
                if (err) res.send(err);
            });

            // return a message
            res.json({
                message: 'Product updated!'
            });
        });
    })

    return apiRouter;
}
