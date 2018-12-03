const Sequelize = require('../dbs/sequelize')
const Orders = require('./Orders')
const Restaurant = require('./Restaurant')

// The data model corresponding to Customer in DB
const Orders_restaurant = Sequelize.define('Orders_restaurant', {
    orders_id: {
        type: Sequelize.STRING(13),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Orders,
            key: orders_id
        }
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Restaurant,
            key: restaurant_id
        }
    },
    ready_time: {
        type: 'TIMESTAMP',
        defaultValue: null
    },
    pickup_time: {
        type: 'TIMESTAMP',
        defaultValue: null
    }
}, {
        // disable the default timestamp
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Orders_restaurant',
    });


Orders_restaurant.belongsTo(Orders)


module.exports = Orders_restaurant