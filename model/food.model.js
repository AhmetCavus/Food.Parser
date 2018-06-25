class FoodModel {

    constructor() {
        this._productItems = [];
        this._genericItems = [];
        this._productCategories = [];
    }

    init(data) {
        this._productItems = data.productItems;
        this._genericItems = data.genericItems;
        this._productCategories = data.productCategories;
    }

    getProductItems() {
        return this._productItems;
    }

    getGenericItems() {
        return this._genericItems;
    }

    getProductCategories() {
        return this._productCategories;
    }
}

var foodModel;
module.exports = () => {
    if(!foodModel) foodModel = new FoodModel();
    return foodModel;
}