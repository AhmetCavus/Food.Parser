var resource = require('../model/resource.model');
var parser = require('../model/store.parser')(resource);
var storeModel = require('../model/store.model')();
var dbService = require('../service/db.service')();

module.exports = {
    getStoresAction: getStoresAction,
    saveAction: saveAction
};

// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
parser
.init()
.then(stores => {
    storeModel.init(parser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

function getStoresAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(storeModel.getStores());
}

function saveAction (req, res) {
    this._res = res;
    res.type(process.env.RES_TYPE);
    dbService.insertStores(storeModel.getStores(), onInsertStoresSuccess, onIsertStoresFail);
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