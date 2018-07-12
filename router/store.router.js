var controller = require('./../controller/store.controller');

module.exports = (app) => {
    
    // Forward requests to the main controller
    app.get('/store', controller.getStoresAction);
    app.get('/store/item', controller.getStoreItemsAction);
    app.get('/store/trade', controller.getTradeItemsAction);
    app.get('/store/save', controller.saveStoresAction);
    app.get('/store/item/save', controller.saveStoreItemsAction);
    app.get('/store/trade/save', controller.saveTradeItemsAction);
};