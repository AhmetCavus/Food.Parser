var controller = require('./../controller/main.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/food', controller.getFoodsAction);
    app.get('/save', controller.saveFoodsAction);
};