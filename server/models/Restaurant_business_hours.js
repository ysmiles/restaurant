const Sequelize = require('sequelize');
const sequelize = require('../dbs/sequelize')
const Restaurant = require('./Restaurant')

const Restaurant_business_hours = sequelize.define('Restaurant_business_hours', {
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Restaurant,
            key: restaurant_id
        }
    },
    workday: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    open_time: { type: Sequelize.TIME, allowNull: false },
    close_time: { type: Sequelize.TIME, allowNull: false },
}, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Restaurant_business_hours',
    });

module.exports = Restaurant_business_hours