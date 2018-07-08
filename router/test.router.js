var controller = require('./../controller/test.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/test', controller.testAction);
};