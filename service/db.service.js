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

        //  SYNC SCHEMA
        this._sequelize
            .sync({ force: true })
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
            fail(error);
        })
    }

    insertGenericItems(genericItems, success, fail) {
        this._genericItem.bulkCreate(genericItems)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(error);
        })
    }

    insertProductCategories(productCategories, success, fail) {
        this._productCategory.bulkCreate(productCategories)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(error);
        })
    }

    insertStores(stores, success, fail) {
        this._store.bulkCreate(stores)
        .then(res => {
            success(res);
        }).catch(err => {
            fail(error);
        })
    }
}

var dbService;
module.exports = () => {
    if(!dbService) dbService = new DbService();
    return dbService;
}