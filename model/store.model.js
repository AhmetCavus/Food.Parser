class StoreModel {

    constructor() {
        this._stores = [];
        this._storeItems = [];
        this._tradeItems = [];
    }

    setStores(data) {
        this._stores = data.stores;
    }

    getStores() {
        return this._stores;
    }

    setStoreItems(data) {
        this._storeItems = data.items;
    }

    getStoreItems() {
        return this._storeItems;
    }

    setTradeItems(data) {
        this._tradeItems = data.items;
    }

    getTradeItems() {
        return this._tradeItems;
    }
}

var storeModel;
module.exports = () => {
    if(!storeModel) storeModel = new StoreModel();
    return storeModel;
}