var moment = require('moment');
var _ = require('lodash');

class StoreItemParser {

    constructor(resModel) {
        this._resModel = resModel;
        this._storeItems = [];
    }

    /**
     * Initilizes the address book with the content of the csv file.
     * The loading is managed by the resource model.
     */
    init() {
        return new Promise(
            (resolve, reject) => {
                this._resModel
                .fetchCsv(process.env.CSV_STORE_ITEM_FILE)
                .then(storeItems => {
                    this._storeItems = storeItems;
                    resolve(this._storeItems);
                })
                .catch(err => {
                    reject(err);
                });
            });
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
        return _.filter(this._storeItems, query);
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
        return _.sortBy(this._storeItems, query);
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
        this._storeItems.forEach((item, index) => {
            item.itemPrice = parseFloat(item.itemPrice.replace(',','.'));
            item.itemPriceUOM = parseFloat(item.itemPriceUOM.replace(',','.'));
        });
        return { items: this._storeItems };
    }

}

var storeItemParser;
module.exports = (resModel) => {
    if(!storeItemParser) storeItemParser = new StoreItemParser(resModel);
    return storeItemParser; 
};