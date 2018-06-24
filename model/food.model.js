class FoodModel {

    constructor() {
        this._foods = [];
        this._formattedFoods = '';
    }

    init(foods) {
        this._foods = foods;
    }

    getAll() {
        return this._foods;
    }
}

var foodModel;
module.exports = () => {
    if(!foodModel) foodModel = new FoodModel();
    return foodModel;
}