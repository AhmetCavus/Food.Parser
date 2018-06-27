var resource = require('../model/resource.model');
var parser = require('../model/food.parser')(resource);
var foodModel = require('../model/food.model')();
var dbService = require('../service/db.service')();

module.exports = {
    getProductItemsAction: getProductItems,
    getGenericItemsAction: getGenericItemsAction,
    getProductCategoriesAction: getProductCategoriesAction,
    saveAction: saveAction
};

dbService.init();

// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
parser
.init()
.then(foods => {
    foodModel.init(parser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

function getProductItems (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(foodModel.getProductItems());
}

function getGenericItemsAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(foodModel.getGenericItems());
}

function getProductCategoriesAction (req, res) {
    res.type(process.env.RES_TYPE);
    res.send(foodModel.getProductCategories());
}

function saveAction (req, res) {
    this._res = res;
    res.type(process.env.RES_TYPE);
    dbService.insertProductItems(foodModel.getProductItems(), onInsertProductItemsSuccess, onIsertProductItemsFail);
}

function onInsertProductItemsSuccess(res) {
    console.log("Product items created");
    dbService.insertGenericItems(foodModel.getGenericItems(), onInsertGenericItemsSuccess, onInsertGenericItemsFail);
}

function onIsertProductItemsFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}

function onInsertGenericItemsSuccess(res) {
    console.log("Generic items created");
    dbService.insertProductCategories(foodModel.getProductCategories(), onInsertProductCategoriesSuccess, onInsertProductCategoriesFail);
}

function onInsertGenericItemsFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}

function onInsertProductCategoriesSuccess(res) {
    console.log("Product categories created");
    console.log("Migration completed successfull");
    this._res.send({
        success: true,
        body: "Migration completed successfull"
    });
}

function onInsertProductCategoriesFail(res) {
    console.log(res);
    this._res.send({
        success: false,
        body: res
    });
}