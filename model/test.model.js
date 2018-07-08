class TestModel {

    constructor() {
        this._testItems = [];
    }

    init(data) {
        this._testItems = data.testItems;
    }

    getItems() {
        return this._testItems;
    }

}

var testModel;
module.exports = () => {
    if(!testModel) testModel = new TestModel();
    return testModel;
}