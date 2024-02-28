function route(app) {
    app.use('/auth', require('./auth.route'));
    app.use('/barcode', require('./barcode.route'));
}

module.exports = route;