var controller = require('./../controller/main.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/productItem', controller.getProductItemsAction);
    app.get('/genericItem', controller.getGenericItemsAction);
    app.get('/productCategory', controller.getProductCategoriesAction);
    app.get('/save', controller.saveAction);
};