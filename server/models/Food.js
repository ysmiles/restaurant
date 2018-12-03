const Sequelize = require('sequelize');
const sequelize = require('../dbs/sequelize')
const Restaurant = require('./Restaurant')

const Food = sequelize.define('Restaurant', {
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        // add composite unique key to meet the constraint unique requiremet for restaurant_id & name in database
        unique: 'restaurantAndName',

        // reference id to restauran model
        references: {
            model: Restaurant,
            key: restaurant_id
        }
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: Sequelize.STRING(50), 
        allowNull: false,
        // constraint unique with restaurant_id
        unique: 'restaurantAndName'
     },
    // photo column may be not necessary
    photo: Sequelize.STRING(200),
    prepare_time: { type: Sequelize.INTEGER, allowNull: false },
    unit_price: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
    deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
}, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Item',
    });

module.exports = Food