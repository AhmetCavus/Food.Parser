var Sequelize = require('sequelize');

class DbService {

    constructor() {}

    init() {
        this._sequelize = new Sequelize('foodDb', null, null, {
            dialect: "sqlite",
            storage: './food.sqlite',
        });

        this._sequelize
            .authenticate()
            .then(function(err) {
                console.log('Connection has been established successfully.');
            }, function (err) {
                console.log('Unable to connect to the database:', err);
            });

        //  MODELS
        this._productItem = this._sequelize.define('ProductItem', {
            productItemId: { type: Sequelize.INTEGER, primaryKey: true }
        });

        this._genericItem = this._sequelize.define('GenericItem', {
            productItemId: Sequelize.INTEGER,
            name: Sequelize.TEXT,
            productCategoryId: Sequelize.INTEGER
        });
      
        this._productCategory = this._sequelize.define('ProductCategory', {
            productCategoryId: { type: Sequelize.INTEGER, primaryKey: true },
            name: Sequelize.TEXT,
            parentId: Sequelize.INTEGER,
            subcategoryId: Sequelize.INTEGER
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

    insertProductItem(productItem) {
        this._productItem.create({
            productItemId: productItem.productItemId
        })
    }

    insertGenericItem(genericItem) {
        this._genericItem.create({
            productItemId: genericItem.productItemId,
            name: genericItem.name,
            productCategoryId: genericItem.productCategoryId
        })
    }

    insertProductCategory(productCategory) {
        this._productCategory.create({
            productCategoryId: productCategory.productCategoryId,
            name: productCategory.name,
            subcategoryId: productCategory.subcategoryId ? productCategory.subcategoryId : null,
            parentId: productCategory.parentId
        })
    }
}

var dbService;
module.exports = () => {
    if(!dbService) dbService = new DbService();
    return dbService;
}