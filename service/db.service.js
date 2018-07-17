var Sequelize = require('sequelize');

class DbService {

    constructor() {}

    init() {
        this._sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            dialectOptions: {
				encrypt: true
            },
            define: {
                //prevent sequelize from pluralizing table names
                freezeTableName: true
            }
        });

        this._sequelize
            .authenticate()
            .then(function(err) {
                console.log('Connection has been established successfully.');
            }, function (err) {
                console.log('Unable to connect to the database:', err);
            });

        //  MODELS
        this._productItem = this._sequelize.define('productItem', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            productItemId: { type: Sequelize.INTEGER }
        });

        this._genericItem = this._sequelize.define('genericItem', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            productItemId: { type: Sequelize.INTEGER, primaryKey: true },
            name: Sequelize.TEXT,
            productCategoryId: Sequelize.INTEGER
        });
      
        this._productCategory = this._sequelize.define('productCategory', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            productCategoryId: { type: Sequelize.INTEGER, primaryKey: true },
            name: Sequelize.TEXT,
            parentId: Sequelize.INTEGER,
            subcategoryId: Sequelize.INTEGER,
            count: Sequelize.INTEGER,
            categoryColor: Sequelize.TEXT
        });

        this._store = this._sequelize.define('store', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            storeId: { type: Sequelize.INTEGER, primaryKey: true },
            effectiveDateTime: Sequelize.DATE,
            name: Sequelize.TEXT,
            street: Sequelize.TEXT,
            housenumber: Sequelize.TEXT,
            zip: Sequelize.TEXT,
            city: Sequelize.TEXT,
            geoposition: Sequelize.TEXT,
            zonegraph: Sequelize.TEXT
        });

        this._storeItem = this._sequelize.define('storeItem', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            storeItemId: Sequelize.TEXT,
            storeId: Sequelize.TEXT,
            tradeItemId: Sequelize.TEXT,
            effectiveDateTime: Sequelize.DATE,
            itemPrice: Sequelize.FLOAT,
            itemPriceCurrency: Sequelize.TEXT,
            itemPriceUOM: Sequelize.FLOAT,
            coordinate: Sequelize.TEXT
        });

        this._tradeItem = this._sequelize.define('tradeItem', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            tradeItemId: Sequelize.TEXT,
            globalTradeNumber: Sequelize.TEXT,
            effectiveDateTime: Sequelize.DATE,
            descriptionShort: Sequelize.TEXT,
            descriptionOfTradeItem: Sequelize.TEXT,
            netContent: Sequelize.TEXT,
            netContentUOM: Sequelize.TEXT,
            tradeItemPrice: Sequelize.FLOAT,
            tradeItemPriceCurrency: Sequelize.TEXT,
            tradeItemPriceUOM: Sequelize.FLOAT,
            iconId: Sequelize.TEXT,
            productCategoryId: Sequelize.TEXT
        });

        //  SYNC SCHEMA
        this._sequelize
            .sync({ force: false })
            .then(function(err) {
                console.log('It worked!');
            }, function (err) {
                console.log('An error occurred while creating the table:', err);
            });
    }

    insertProductItems(productItems, success, fail) {
        this._productItem.bulkCreate(productItems)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }

    insertGenericItems(genericItems, success, fail) {
        this._genericItem.bulkCreate(genericItems)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }

    insertProductCategories(productCategories, success, fail) {
        this._productCategory.bulkCreate(productCategories)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }

    insertStores(stores, success, fail) {
        this._store.bulkCreate(stores)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }

    insertStoreItems(storeItems, success, fail) {
        this._storeItem.bulkCreate(storeItems)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }

    insertTradeItems(tradeItems, success, fail) {
        this._tradeItem.bulkCreate(tradeItems)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(err);
        })
    }
}

var dbService;
module.exports = () => {
    if(!dbService) dbService = new DbService();
    return dbService;
}