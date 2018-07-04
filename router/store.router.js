var controller = require('./../controller/store.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/store', controller.getStoresAction);
    app.get('/store/save', controller.saveAction);
};