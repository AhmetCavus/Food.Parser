var moment = require('moment');
var _ = require('lodash');

class FoodParser {

    constructor(resModel) {
        this._resModel = resModel;
        this._productItems = [];
        this._genericItems = [];
        this._productCategories = [];
    }

    /**
     * Initilizes the address book with the content of the csv file.
     * The loading is managed by the resource model.
     */
    init() {
        return new Promise(
            (resolve, reject) => {
                this._resModel
                .fetchCsv(process.env.CSVFILE)
                .then(genericItems => {
                    this._genericItems = genericItems;
                    resolve(this._genericItems);
                })
                .catch(err => {
                    reject(err);
                });
            });
    }

    /**
     * Converts the raw date string to ISO Date	"2015-03-25"
     * https://www.w3schools.com/js/js_date_formats.asp
     * 
     * @param {String} a raw date string DD/MM/YY
     * @returns {Date} Reformatted ISO Date
     */
    reformatDate(date) {
        return moment(date, 'DD/MM/YY').format('YYYY-MM-DD');
    }

    /**
     * Iterates over elements of collection, returning an array of all elements
     * For more information see
     * https://lodash.com/docs/#filter
     * 
     * @param {Object} an object of format {key: string, value: string}
     * @returns {Array} The filtered array
     */
    fetch(query) {
        return _.filter(this._foods, query);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results 
     * of running each element in a collection thru each iteratee. 
     * For more information see
     * https://lodash.com/docs/#sortBy
     * 
     * @param {Array} an array of sorting keys 
     * @returns {Array} The sorted address array
     */
    sort(query) {
        return _.sortBy(this._foods, query);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results 
     * of running each element in a collection thru each iteratee. 
     * For more information see
     * https://lodash.com/docs/#map
     * 
     * @param {Array} an array of sorting keys 
     * @returns {Array} The sorted address array
     */
    parse() {
        this._genericItems = _.map(this._genericItems, item => {
            var catObject = { id: parseInt(item["ID"]) * 10 }
            var categories = item["category D"].split('/');
            var catId = this.createCategory(categories, 0, null, catObject.id);
            return { productItemId: parseInt(item["ID"]), name: item["name D"], productCategoryId: catId }
        }).sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1);
        this._productItems = _.map(this._genericItems, item => { return { productItemId: item.productItemId } })
        this._productCategories = _.map(this._productCategories, item => {
            item.count = _.filter(this._genericItems, subitem => subitem.productCategoryId === item.productCategoryId).length;
            item.count = item.count <= 0 ? (item.subcategoryId ? 1 : 0) : item.count;
            return item;
        });
        return { productItems: this._productItems, genericItems: this._genericItems, productCategories: this._productCategories };
    }

    createCategory(categories, index, prevCat, catId) {
        if(categories.length <= index) return prevCat.productCategoryId;
        var currentCat = categories[index];
        var found = _.find(this._productCategories, (item) => item.name === currentCat);
        if(found) {
            return this.createCategory(categories, index+1, found, catId + 10);
        } else {
            var catObject = { productCategoryId: catId, name: categories[index], parentId: prevCat ? prevCat.productCategoryId : null, subcategoryId: categories.length <= index+1 ? null : catId +10 };
            this._productCategories.push(catObject);
            return this.createCategory(categories, index+1, catObject, catId + 10);
        }

    }

}

var foodParser;
module.exports = (resModel) => {
    if(!foodParser) foodParser = new FoodParser(resModel);
    return foodParser; 
};