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
    res.type('application/json');
    res.send(foodModel.getProductItems());
}

function getGenericItemsAction (req, res) {
    res.type('application/json');
    res.send(foodModel.getGenericItems());
}

function getProductCategoriesAction (req, res) {
    res.type('application/json');
    res.send(foodModel.getProductCategories());
}

function saveAction (req, res) {
    res.type('application/json');
    foodModel.getProductItems().forEach(productItem => {
        dbService.insertProductItem(productItem);
    });
    foodModel.getGenericItems().forEach(genericItem => {
        dbService.insertGenericItem(genericItem);
    });
    foodModel.getProductCategories().forEach(category => {
        dbService.insertProductCategory(category);
    });
    res.send({ success: true });
}