var resource = require('../model/resource.model');
var storeParser = require('../model/store.parser')(resource);
var storeItemParser = require('../model/storeItem.parser')(resource);
var tradeItemParser = require('../model/tradeItem.parser')(resource);
var storeModel = require('../model/store.model')();
var dbService = require('../service/db.service')();

module.exports = {
    getStoresAction: getStoresAction,
    getStoreItemsAction: getStoreItemsAction,
    getTradeItemsAction: getTradeItemsAction,
    saveStoresAction: saveStoresAction,
    saveStoreItemsAction: saveStoreItemsAction,
    saveTradeItemsAction: saveTradeItemsAction
};

// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
storeParser
.init()
.then(items => {
    storeModel.setStores(storeParser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

storeItemParser
.init()
.then(items => {
    storeModel.setStoreItems(storeItemParser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

tradeItemParser
.init()
.then(items => {
    storeModel.setTradeItems(tradeItemParser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

function getStoresAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(storeModel.getStores());
}

function getStoreItemsAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(storeModel.getStoreItems());
}

function getTradeItemsAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(storeModel.getTradeItems());
}

function saveStoresAction (req, res) {
    this._res = res;
    res.type(process.env.RES_TYPE);
    dbService.insertStores(storeModel.getStores(), onInsertStoresSuccess, onIsertStoresFail);
}

function saveStoreItemsAction (req, res) {
    this._res = res;
    res.type(process.env.RES_TYPE);
    dbService.insertStoreItems(storeModel.getStoreItems(), onInsertStoreItemsSuccess, onIsertStoreItemsFail);
}

function saveTradeItemsAction (req, res) {
    this._res = res;
    res.type(process.env.RES_TYPE);
    dbService.insertTradeItems(storeModel.getTradeItems(), onInsertTradeItemsSuccess, onIsertTradeItemsFail);
}

function onInsertStoresSuccess(res) {
    console.log("Product categories created");
    console.log("Migration completed successfull");
    this._res.send({
        success: true,
        body: "Migration completed successfull"
    });
}

function onIsertStoresFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}

function onInsertStoreItemsSuccess(res) {
    console.log("Product categories created");
    console.log("Migration completed successfull");
    this._res.send({
        success: true,
        body: "Migration completed successfull"
    });
}

function onIsertStoreItemsFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}

function onInsertTradeItemsSuccess(res) {
    console.log("Product categories created");
    console.log("Migration completed successfull");
    this._res.send({
        success: true,
        body: "Migration completed successfull"
    });
}

function onIsertTradeItemsFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}