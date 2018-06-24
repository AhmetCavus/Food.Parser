var moment = require('moment');
var _ = require('lodash');

class FoodParser {

    constructor(resModel) {
        this._resModel = resModel;
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
                .then(foods => {
                    this._foods = foods;
                    resolve(this._foods);
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
    formatItems() {
        return _.map(this._foods, item => {
            var catObject = {};
            var id = parseInt(item["ID"]) * 100;
            this.createCategory(item["category D"].split('/'), 0, catObject, id);
            return { id: parseInt(item["ID"]), name: item["name D"], category: catObject.subcategory }
        }).sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1);
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
    formatCategories() {
        return _.map(this._foods, item => {
            this._categories = [];
            var id = parseInt(item["ID"]) * 100;
            var categories = item["category D"].split('/');
            categroies.forEach(cat => {
                var found = _.find(this._categories, (item) => item.name === cat);
                if(!found) continue;
            });
            return { id: parseInt(item["ID"]), name: item["name D"], category: catObject.subcategory }
        }).sort((a, b) => +(a.id > b.id) || +(a.id === b.id) - 1);
    }

    createCategory(categories, index, catObject, id) {
        if(categories.length <= index) return;
        catObject.subcategory = { id: id, name: categories[index], parentId: catObject.id };
        this.createCategory(categories, index+1, catObject.subcategory, id + 10);
    }
}

var foodParser;
module.exports = (resModel) => {
    if(!foodParser) foodParser = new FoodParser(resModel);
    return foodParser; 
};