// export everytthing and make sure the same instances of app and express are
// used across routing files b ypassing them as parameters
var path = require('path');

module.exports = function(app, express) {

    var basicRouter = express.Router();

    // Routes for our expressApp
    basicRouter.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/views/pages', 'index.html'));
    });

    basicRouter.get('/edit', function(req, res) {
        res.sendFile(path.join(__dirname, '../../client/views/pages', 'edit.html'));
    });

    return basicRouter;

}
