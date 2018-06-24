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
        this._genericItem = this._sequelize.define('GenericItem', {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: Sequelize.TEXT,
            category: Sequelize.INTEGER
        });
      
        this._productCategory = this._sequelize.define('ProductCategory', {
            id: { type: Sequelize.INTEGER, primaryKey: true },
            name: Sequelize.TEXT,
            subcategory: Sequelize.INTEGER,
            parentId: Sequelize.INTEGER
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

    insertCategory(categoryData) {
        this._productCategory.create({
            id: categoryData.id,
            name: categoryData.name,
            subcategory: categoryData.subcategory ? categoryData.subcategory.id : null,
            parentId: categoryData.parentId
        })
        if(!categoryData.subcategory) return;
        this.insertCategory(categoryData.subcategory);
    }
}

var dbService;
module.exports = () => {
    if(!dbService) dbService = new DbService();
    return dbService;
}