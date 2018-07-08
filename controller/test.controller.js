const resource = require('../model/resource.model');
const testModel = require('../model/test.model')();
const parser = require('../model/test.parser')(resource);

module.exports = {
    testAction: testAction
};

// Initialize the address book with the data from the csv file.
// Then build up the answers with the AddressBookModel.
parser
.init()
.then(items => {
    testModel.init(parser.parse());
})
.catch(err => {
    console.log(err);
    throw err;
});

function testAction(req, res) {
    res.type(process.env.RES_TYPE);
    res.send(testModel.getItems());
}