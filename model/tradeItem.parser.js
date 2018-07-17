var moment = require('moment');
var _ = require('lodash');

class TradeItemParser {

    constructor(resModel) {
        this._resModel = resModel;
        this._tradeItems = [];
    }

    /**
     * Initilizes the address book with the content of the csv file.
     * The loading is managed by the resource model.
     */
    init() {
        return new Promise(
            (resolve, reject) => {
                this._resModel
                .fetchCsv(process.env.CSV_TRADE_ITEM_FILE)
                .then(tradeItems => {
                    this._tradeItems = tradeItems;
                    resolve(this._tradeItems);
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
        return _.filter(this._tradeItems, query);
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
        return _.sortBy(this._tradeItems, query);
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
        this._tradeItems.forEach((item, index) => {
            item.tradeItemPrice = parseFloat(item.tradeItemPrice.replace(',','.'));
            item.tradeItemPriceUOM = parseFloat(item.tradeItemPriceUOM.replace(',','.'));
        });
        return { items: this._tradeItems };
    }

}

var tradeItemParser;
module.exports = (resModel) => {
    if(!tradeItemParser) tradeItemParser = new TradeItemParser(resModel);
    return tradeItemParser; 
};