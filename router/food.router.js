var controller = require('./../controller/food.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/food/productItem', controller.getProductItemsAction);
    app.get('/food/genericItem', controller.getGenericItemsAction);
    app.get('/food/productCategory', controller.getProductCategoriesAction);
    app.get('/food/save', controller.saveAction);
};