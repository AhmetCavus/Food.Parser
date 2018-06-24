var resource = require('../model/resource.model');
var parser = require('../model/food.parser')(resource);
var foodModel = require('../model/food.model')();
var dbService = require('../service/db.service')();

module.exports = {
    getFoodsAction: getFoodsAction,
    saveFoodsAction: saveFoodsAction
};

dbService.init();

// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
parser
.init()
.then(foods => {
    foodModel.init(parser.format());
})
.catch(err => {
    console.log(err);
    throw err;
});

function getFoodsAction (req, res) {
    res.type('application/json');
    res.send(foodModel.getAll());
}

function saveFoodsAction (req, res) {
    res.type('application/json');
    foodModel.getAll().forEach(food => {
        dbService.insertCategory(food.category);
    });
    res.send({ success: true });
}