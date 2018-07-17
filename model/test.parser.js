var moment = require('moment');
var _ = require('lodash');

class TestParser {

    constructor(resModel) {
        this._resModel = resModel;
        this._testItems = [];
        this._testCategories = [];
    }

    /**
     * Initilizes the address book with the content of the csv file.
     * The loading is managed by the resource model.
     */
    init() {
        return new Promise(
            (resolve, reject) => {
                this._resModel
                .fetchCsv(process.env.TEST_DATA_FILE)
                .then(testItems => {
                    this._testItems = testItems;
                    this._resModel
                    .fetchJson(process.env.TEST_DATA_FILE_2)
                    .then(categoryItems => {
                        this._testCategories = categoryItems;
                        resolve(this._testCategories);
                    })
                    .catch(err => {
                        reject(err);
                    });
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
    parseMergedGenericItems() {
        var categories = [];
        // Execute the query. The context for Mobile Apps is available through
        // request.azureMobile. The data object contains the configured data provider.
        var mappedItems =
        _.map(this._testItems, item => {
            var catObject = _.find(categories, cat => cat.id === item.productCategoryId);
            if(catObject) {
                catObject.items.push(this.createItem(item));
            } else {
                var catObject = {
                    id: item.productCategoryId,
                    name: item.categoryName,
                    color: item.categoryColor,
                    items: [
                        this.createItem(item)
                    ]
                }
                categories.push(catObject);
            }
            return catObject;
        });
        var unorderedItems = this.removeDuplicates(mappedItems, 'id');
        var result = _.orderBy(unorderedItems, item => item.id);
        return { testItems: result };
    }

        // "id": 1,
        // "productItemId": 771,
        // "name": "Mayonnaise",
        // "productCategoryId": 7720,
        // "createdAt": "2018-07-04T07:25:57.838Z",
        // "updatedAt": "2018-07-04T07:25:57.838Z",
        // "deleted": false,
        // "version": "AAAAAAAAaek="

    // tradeItemId;globalTradeNumber;descriptionShort;descriptionOfTradeItem;netContent;netContentUOM;tradeItemPrice;tradeItemPriceCurrency;tradeItemPriceUOM;iconId;productCategoryId

    /**
     * Creates an array of elements, sorted in ascending order by the results 
     * of running each element in a collection thru each iteratee. 
     * For more information see
     * https://lodash.com/docs/#map
     * 
     * @param {Array} an array of sorting keys 
     * @returns {Array} The sorted address array
     */
    parseExternalFoods() {
        this._resModel

        var mappedItems =
        _.map(this._testItems, item => {
            var catNames = item.productCategoryId.split('/');
            var catName = catNames[catNames.length-1];
            var searchItem = _.find(this._testCategories, cat => cat.name === catName);
            item.productCategoryId = searchItem ? searchItem.productCategoryId : '';
            item.tradeItemPrice = parseFloat(item.tradeItemPrice.replace(',','.'));
            item.tradeItemPriceUOM = parseFloat(item.tradeItemPriceUOM.replace(',','.'));
            return item;
        });
        var result = _.orderBy(mappedItems, item => item.id);
        return { testItems: result };
    }

    createItem(item) {
        return {
            id: item.productItemId,
            name: item.productName
        }
    }

    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
    

}

var testParser;
module.exports = (resModel) => {
    if(!testParser) testParser = new TestParser(resModel);
    return testParser; 
};