class StoreModel {

    constructor() {
        this._stores = [];
    }

    init(data) {
        this._stores = data.stores;
    }

    getStores() {
        return this._stores;
    }
}

var storeModel;
module.exports = () => {
    if(!storeModel) storeModel = new StoreModel();
    return storeModel;
}